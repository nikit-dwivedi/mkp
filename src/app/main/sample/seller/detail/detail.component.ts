import { AdminService } from "./../../../../services/admin.service";
import { InventoryService } from "./../../../../services/inventory.service";
import { Navigation, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from "@angular/forms";
import { FileUploader } from "ng2-file-upload";
import { Observable } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

const URL = "localhost:4019/";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"],
})
export class DetailComponent implements OnInit {
  public contentHeader: object;
  public sellerDetail: any;
  public sellerOutlet: any;
  public outletForm: FormGroup;
  public outletFormSubmitted = false;
  public imageData: any;
  public openingHourdata = { hour: 13, minute: 30 };
  public closingHourdata = { hour: 13, minute: 30 };
  public meridianTP = true;
  public selectBasic: any= [];
  public selectedCuisineId : any
  public selectBasicLoading = false;

  public uploader: FileUploader = new FileUploader({
    url: URL,
  });

  cuisineList:any;
  addCuisineForm:FormGroup;
  selectedCusine:any;
  cuisineArray = [];
  // Reactive User Details form data
  public addOutletForm = {
    outletName: "",
    outletImage: "",
    type: "",
    preparationTime: "",
    area: "",
    isVeg: "",
    openingHour: "",
    closingHour: "",
    cuisine: "",
    address: "",
  };

  constructor(private router: Router, private adminService: AdminService, private inventoryService: InventoryService,private formBuilder: UntypedFormBuilder, private modalService: NgbModal) {
    let nav: Navigation = this.router.getCurrentNavigation();
    if (nav.extras && nav.extras.state && nav.extras.state.sellerDetail) {
      this.sellerDetail = nav.extras.state.sellerDetail;
    } else {
      this.router.navigate(["seller"]);
    }
  }

  modalSelectOpen(modalSelect) {
    // this.selectBasicMethod()
    this.modalService.open(modalSelect, {
      windowClass: 'modal'
    });
    this.allCuisineList();
  }

  allCuisineList(){
    this.adminService.getAllCuisine().subscribe((data:any) => {
      this.cuisineList = data.items;
      console.log("Cuisine List=============>",this.cuisineList);
      
    });
  }


  // private selectBasicMethod() {
  //   this.selectBasicLoading = true;
  //   this.inventoryService.getAllCuisine().subscribe(x => {
  //     this.selectBasic = x;
  //     this.selectBasicLoading = false;
  //   });
  //   console.log(this.selectBasicLoading);
  //   console.log(this.selectBasic);
    
  // }


  ngOnInit(): void {
    // Reactive form initialization
    this.outletForm = this.formBuilder.group({
      outletName: ["", Validators.required],
      outletImage: ["", Validators.required],
      type: ["", Validators.required],
      preparationTime: ["", [Validators.required]],
      area: ["", [Validators.required]],
      isVeg: ["", [Validators.required]],
      openingHour: ["", [Validators.required]],
      closingHour: ["", [Validators.required]],
      cuisine: ["", [Validators.required]],
      address: ["", [Validators.required]],
    });


    this.addCuisineForm = this.formBuilder.group({
      cuisineName: new FormControl(''),
    });

    

    this.sellersOutletList(this.sellerDetail.sellerId);
    this.contentHeader = {
      headerTitle: "Seller",
      actionButton: true,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "List",
            isLink: true,
            link: "/seller",
          },
          {
            name: "Details",
            isLink: false,
          },
        ],
      },
    };
    
    
  }

  onCuisineSelect(cuisine:any){
    if (this.cuisineArray.includes(cuisine.cuisineId)) {
      let index = this.cuisineArray.indexOf(cuisine.cuisineId)
      this.cuisineArray.splice(index, 1);
    } else {
      this.cuisineArray.push(cuisine.cuisineId)
    }
    console.log("Selected====>",this.cuisineArray);
  }

  get ReactiveUDForm() {
    return this.outletForm.controls;
  }

  ReactiveUDFormOnSubmit() {
    this.outletFormSubmitted = true;
    this.outletForm.value.openingHour=this.formatTime(this.outletForm.value.openingHour)
    this.outletForm.value.closingHour=this.formatTime(this.outletForm.value.closingHour)
    this.outletForm.value.cuisine = this.cuisineArray;
    // console.table(this.outletForm.value);
    // stop here if form is invalid
    if (this.outletForm.invalid) {
      return;
    }
    
    let bodyData = { sellerId: this.sellerDetail.sellerId, ...this.outletForm.value };
    console.log("Body Ka Data===================>",bodyData);

    alert("SUCCESS!! :-)");
  }

  getImage(event: any): any {
    this.imageData = event.target.files[0];
    this.outletForm.value.outletImage = this.imageData;
    
  }

  sellersOutletList(sellerId: String): any {
    this.adminService.getSellersOutlet(sellerId).subscribe((response) => {
      if (response.status) {
        this.sellerOutlet = response.items;
      }
    });
  }

 
  formatTime(dateObject:any):any{
    let {hour,minute} = dateObject
    let timeSet = "AM"
    if (hour>=12) {
      timeSet = "PM"
      hour = hour - 12
    }
    if (hour==0) {
      hour = 12
    }
    minute=minute==0?`0${minute}`:minute
    return`${hour}:${minute} ${timeSet}`
  }
}
