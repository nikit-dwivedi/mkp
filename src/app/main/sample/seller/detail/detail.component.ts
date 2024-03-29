import { AdminService } from "./../../../../services/admin.service";
import { InventoryService } from "./../../../../services/inventory.service";
import { Navigation, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from "@angular/forms";
import { FileUploader } from "ng2-file-upload";
import { Observable } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";

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
  public selectBasic: any = [];
  public selectedCuisineId: any;
  public selectBasicLoading = false;

  public uploader: FileUploader = new FileUploader({
    url: URL,
  });

  cuisineList: any;
  addCuisineForm: FormGroup;
  selectedCusine: any;
  cuisineArray = [];
  images: any;
  loading: Boolean = false;
  cuisineData: any;
  cuisineIdList: any;
  public basicDetailForm: FormGroup;
  public authorizedPersonDetailForm: FormGroup;
  // Reactive User Details form data
  public addOutletForm = {
    outletName: "",
    outletImage: "",
    type: "",
    preparationTime: "",
    area: "",
    isVeg: false,
    openingHour: "",
    closingHour: "",
    cuisine: "",
    shopAddress: "",
    longitude: 0,
    latitude: 0,
  };
  isSubmitted: any;

  constructor(private router: Router, private adminService: AdminService, private toastr: ToastrService, private inventoryService: InventoryService, private formBuilder: UntypedFormBuilder, private modalService: NgbModal) {
    let nav: Navigation = this.router.getCurrentNavigation();
    if (nav.extras && nav.extras.state && nav.extras.state.sellerDetail) {
      this.sellerDetail = nav.extras.state.sellerDetail;
    } else {
      this.router.navigate(["seller"]);
    }
  }

  modalSelectOpen(modalSelect: any) {
    // this.selectBasicMethod()
    this.modalService.open(modalSelect, {
      windowClass: "modal",
    });
    this.allCuisineList();
  }

  openAuthorizedPersonModal(modalSelect: any) {
    this.modalService.open(modalSelect, {
      centered: true,
      scrollable: true,
      size: "sm",
    });
    this.authorizedPersonDetailForm.patchValue({
      name: this.sellerDetail.authorizedPersonDetails.name,
      phone: this.sellerDetail.authorizedPersonDetails.phone,
      email: this.sellerDetail.authorizedPersonDetails.email,
    });
  }

  openBasicModal(modalSelect: any) {
    this.modalService.open(modalSelect, {
      centered: true,
      scrollable: true,
      size: "sm",
    });

    this.basicDetailForm.patchValue({
      sellerName: this.sellerDetail.basicDetails.sellerName,
      tradeName: this.sellerDetail.basicDetails.tradeName,
      phone: this.sellerDetail.basicDetails.phone,
    });
  }

  allCuisineList() {
    this.adminService.getAllCuisine().subscribe((data: any) => {
      this.cuisineList = data.items;
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
    // outlet form
    this.outletForm = this.formBuilder.group({
      outletName: ["", Validators.required],
      outletImage: ["", Validators.required],
      type: ["", Validators.required],
      preparationTime: ["", [Validators.required]],
      area: ["", [Validators.required]],
      isVeg: [false, [Validators.required]],
      openingHour: ["", [Validators.required]],
      closingHour: ["", [Validators.required]],
      // cuisine: ["", [Validators.required]],
      shopAddress: ["", [Validators.required]],
      longitude: [0, [Validators.required]],
      latitude: [0, [Validators.required]],
    });

    // seller form
    this.basicDetailForm = this.formBuilder.group({
      sellerName: ["", Validators.required],
      tradeName: ["", Validators.required],
      phone: ["", [Validators.required]],
    });

    this.authorizedPersonDetailForm = this.formBuilder.group({
      name: ["", Validators.required],
      phone: ["", Validators.required],
      email: ["", [Validators.required]],
    });

    // this.addCuisineForm = this.formBuilder.group({
    //   cuisineName: new FormControl(''),
    // });

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

  get basicDetailFormControls() {
    return this.basicDetailForm.controls;
  }

  get authorizedPersonDetailFormControls() {
    return this.authorizedPersonDetailForm.controls;
  }

  onCuisineSelect(cuisine: any) {
    if (this.cuisineArray.includes(cuisine.cuisineId)) {
      let index = this.cuisineArray.indexOf(cuisine.cuisineId);
      this.cuisineArray.splice(index, 1);
    } else {
      this.cuisineArray.push(cuisine.cuisineId);
    }
  }

  cuisineCheck(cuisineId: any) {
    // console.log(cuisineId);

    if (this.cuisineArray.includes(cuisineId)) {
      return true;
    } else {
      return false;
    }
  }

  get ReactiveUDForm() {
    return this.outletForm.controls;
  }

  submitBasicDetailForm() {
    this.loading = true;
    this.isSubmitted = true;
    if (this.basicDetailForm.invalid) {
      return;
    }
    const bodyData = {
      basicDetails: {
        sellerName: this.basicDetailForm.value.sellerName,
        phone: this.basicDetailForm.value.phone,
        tradeName: this.basicDetailForm.value.tradeName,
      },
    };
    this.updateSeller(bodyData);
  }

  updateSeller(bodyData: any) {
    this.adminService.editSellerDetails(this.sellerDetail.sellerId, bodyData).subscribe((data: any) => {
      if (data.status) {
        this.loading = false;
        this.isSubmitted = false;
        this.modalService.dismissAll();
        this.router.navigate(["seller"]);
        this.toastr.success(data.message, "Success!");
      } else {
        this.loading = false;
        this.isSubmitted = false;
        this.toastr.error(data.message, "error");
      }
    });
  }

  submitAuthorizedPersonDetailForm() {
    this.loading = true;
    this.isSubmitted = true;
    if (this.authorizedPersonDetailForm.invalid) {
      return;
    }
    const bodyData = {
      authorizedPersonDetails: {
        name: this.authorizedPersonDetailForm.value.name,
        phone: this.authorizedPersonDetailForm.value.phone,
        email: this.authorizedPersonDetailForm.value.email,
      },
    };
    this.updateSeller(bodyData);
  }

  ReactiveUDFormOnSubmit() {
    this.loading = true;
    this.outletFormSubmitted = true;
    this.outletForm.value.openingHour = this.formatTime(this.outletForm.value.openingHour);
    this.outletForm.value.closingHour = this.formatTime(this.outletForm.value.closingHour);
    this.outletForm.value.cuisine = this.cuisineArray;
    // stop here if form is invalid
    if (this.outletForm.invalid) {
      return;
    }
    const openingHours: any = [`${this.outletForm.value.openingHour} - ${this.outletForm.value.closingHour}`];
    const formData = new FormData();
    formData.append("outletName", this.outletForm.value.outletName);
    formData.append("outletImage", this.imageData);
    formData.append("type", this.outletForm.value.type);
    formData.append("preparationTime", this.outletForm.value.preparationTime);
    formData.append("area", this.outletForm.value.area);
    formData.append("isVeg", this.outletForm.value.isVeg);
    formData.append("openingHours", openingHours);
    formData.append("shopAddress", this.outletForm.value.shopAddress);
    formData.append("cuisines", this.outletForm.value.cuisine);
    formData.append("longitude", this.outletForm.value.longitude);
    formData.append("latitude", this.outletForm.value.latitude);
    formData.append("sellerId", this.sellerDetail.sellerId);

    // add outlet api call
    this.adminService.addOutlet(formData).subscribe((data: any) => {
      if (data.status) {
        this.loading = false;
        this.toastr.success(data.message, "Success!");
      } else {
        this.loading = false;
        this.toastr.error(data.message, "error");
      }
    });
  }

  getImage(event: any): any {
    this.imageData = event.target.files[0];
  }

  sellersOutletList(sellerId: String): any {
    this.adminService.getSellersOutlet(sellerId).subscribe((response) => {
      if (response.status) {
        this.sellerOutlet = response.items;
      }
    });
  }

  formatTime(dateObject: any): any {
    let { hour, minute } = dateObject;
    let timeSet = "AM";
    if (hour >= 12) {
      timeSet = "PM";
      hour = hour - 12;
    }
    if (hour == 0) {
      hour = 12;
    }
    minute = minute == 0 ? `0${minute}` : minute;
    return `${hour}:${minute} ${timeSet}`;
  }
}
