import { Component, OnInit, ViewChild } from "@angular/core";
import { AdminService } from "../../../services/admin.service";
import { FormControl, FormBuilder, FormGroup } from "@angular/forms";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { Router } from "@angular/router";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-all-outlet",
  templateUrl: "./all-outlet.component.html",
  styleUrls: ["./all-outlet.component.scss"],
})
export class AllOutletComponent implements OnInit {
  editOutletForm: FormGroup;

  public contentHeader: object;
  public rows: any;
  public sellerOutlet: any;
  public sellerDetail: any;
  private tempData = [];
  public ColumnMode = ColumnMode;
  // config: NgbModalOptions;
  public basicSelectedOption: number = 5;
  public kitchenSinkRows = [];
  submitted: Boolean = false;
  allOutletList: any;
  verificationStatus:any;
  outletId: any;
  outletDetails: any;
  editOutletById: any;
  imageData: any;
  cuisineList: any;
  isChecked: Boolean = true;
  checkedData: any;
  cuisineArray = [];
  imageArray = [];
  cuisineData: any;
  loading:Boolean = true;
  isConfirm:Boolean = false;
  
  // config: NgbModalOptions;
  @ViewChild(AllOutletComponent) table: AllOutletComponent | any;
  @ViewChild("tableRowDetails") tableRowDetails: any;
  constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router, private toastr: ToastrService, private modalService: NgbModal, config: NgbModalConfig) {}

  ngOnInit(): void {
    this.allOutlet();
    this.editOutletForm = this.fb.group({
      outletName: new FormControl(""),
      preparationTime: new FormControl(""),
      shopAddress: new FormControl(""),
      outletImage: new FormControl([]),
      cuisine: new FormControl([]),
    });
  }

  get f() {
    return this.editOutletForm.controls;
  }

  allOutlet() {
    this.adminService.getAllOutlet().subscribe((data: any) => {
      this.allOutletList = data.items;
      this.rows = data.items;
      this.kitchenSinkRows = this.rows;
      this.tempData = this.rows;
   });
  }

  // open edit cuisine Modal
  openEditCuisineModal(data: any) {
    this.modalService.open(data, {
      centered: true,
      scrollable: true,
      size: "md",
    });
    this.allCuisineList();
  }

  // get select image
  getImage(event:any) {
    this.imageData = event.target.files[0];
    console.log(this.imageData);
    
  }
  // open edit outlet Modal
  openEditOutletModal(data: any, editOutlet: any) {
    this.editOutletForm.reset();

    this.modalService.open(data, {
      centered: true,
      scrollable: true,
      size: "lg",
    });
// console.log(editOutlet.outletImage);


    this.cuisineData = editOutlet.cuisines;
    this.cuisineArray = this.cuisineData.map((cuisine: any) => {
      return cuisine.cuisineId;
    });

    // if(this.cuisineData){
    //   this.isChecked == false
    // }
    // else{
    //   this.isChecked == true
    // }

    this.editOutletById = editOutlet.outletId;
    console.log(this.editOutletById);
    

    this.editOutletForm.patchValue({
      outletName: editOutlet.outletName,
      preparationTime: editOutlet.preparationTime,
      cuisines: editOutlet.cuisines,
      outletImage: editOutlet.outletImage,
      shopAddress: editOutlet.shopAddress,
    });
  }

  editOutletFormSubmit() {
    this.loading == true;
    this.editOutletForm.value.cuisines = this.cuisineArray;
    // this.submitted == true;
    if (this.editOutletForm.invalid){
      return;
    } 
    else {
     
      const formData = new FormData();
      formData.append("outletName",this.editOutletForm.value.outletName);
      formData.append("preparationTime",this.editOutletForm.value.preparationTime);
      formData.append("cuisines",this.editOutletForm.value.cuisines);
      // formData.append("outletImage",this.imageData);
      formData.append("shopAddress",this.editOutletForm.value.shopAddress);

      console.log(this.editOutletForm.value.outletImage);

       if(this.imageData == undefined){
        formData.append("outletImage",this.editOutletForm.value.outletImage)
      }
      else{
        formData.append("outletImage",this.imageData)
      }
      
      this.adminService.editOutletByOutletId(this.editOutletById,formData).subscribe((data:any) => {
        if(data.status){
          this.loading = false;
          this.toastr.success(data.message,"Success!");
          this.modalService.dismissAll();
          this.allOutlet();
        }
        else{
          this.loading = false;
          this.toastr.error(data.message,"error!");
        }
      });
      
    }
  }

  // get all cuisine list
  allCuisineList() {
    this.adminService.getAllCuisine().subscribe((data: any) => {
      this.cuisineList = data.items;
    });
  }

  // select cuisine form
  onCuisineSelect(cuisine: any) {
    if (this.cuisineArray.includes(cuisine.cuisineId)) {
      let index = this.cuisineArray.indexOf(cuisine.cuisineId);
      this.cuisineArray.splice(index, 1);
    } else {
      this.cuisineArray.push(cuisine.cuisineId);
    }
  }

  cuisineCheck(cuisineId: any) {
    return this.cuisineArray.includes(cuisineId) ? true : false;
  }

  selectButtonClass(isClosed: boolean): any {
    switch (isClosed) {
      case true:
        return "badge-light-danger";
      case false:
        return "badge-light-info";
    }
  }

  // editOutletDetails(outletId: any, bodyData: any) {
  //   this.adminService.editOutletByOutletId(outletId, bodyData).subscribe((data: any) => {
  //     if (data.status) {
  //       this.toastr.success(data.message, "Success!");
  //       this.allOutlet();
  //       this.modalService.dismissAll();
  //     } else {
  //       this.toastr.error(data.message, "error!");
  //     }
  //   });
  // }
  // verify outlet
  verifyOutlet( status: any) {
    this.adminService.changeVerificationStatusOfOutlet({ outletId: this.outletId, status }).subscribe((data: any) => {
      if (data.status) {
        this.toastr.success(data.message, "Success!");
        this.allOutlet();
        this.modalService.dismissAll();
      } else {
        this.toastr.error(data.message, "error!");
      }
    });
  }

  // change outlet status
  changeOutletStatus(data: any, seller: any) {
    this.modalService.open(data, {
      centered: true,
      scrollable: true,
      size: "lg",
    });
    this.outletId = seller.outletId;
    this.verificationStatus=seller.isVerified
    
  }

  onOffstatus() {
    this.adminService.changeStatus(this.outletId).subscribe((data: any) => {
      if (data.status) {
        this.toastr.success(data.message, "Success!");
        this.allOutlet();
        this.modalService.dismissAll();
      } else {
        this.toastr.error(data.message, "error!");
      }
    });
  }

  navigateToDetail(outletDetails: any) {
    this.router.navigate(["menu"], { state: { outletDetails } });
  }

  filterUpdate(event: any) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.outletName?.toLowerCase().indexOf(val) !== -1 || d.sellerId?.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.kitchenSinkRows = temp;
    // Whenever the filter changes, always go back to the first page
  }
}
