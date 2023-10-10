import { Component, OnInit, ViewChild } from "@angular/core";
import { AdminService } from "../../../services/admin.service";
import { FormControl, FormBuilder, FormGroup, FormArray } from "@angular/forms";
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
  verificationStatus: any;
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
  loading: Boolean = false;
  isConfirm: Boolean = true;

  public daysList: any = [
    {
      day: "monday",
      hours: [""],
      openingHours: [{}],
      closingHours: [{}],
    },
    {
      day: "tuesday",
      hours: [""],
      openingHours: [{}],
      closingHours: [{}],
    },
    {
      day: "wednesday",
      hours: [""],
      openingHours: [{}],
      closingHours: [{}],
    },
    {
      day: "thursday",
      hours: [""],
      openingHours: [{}],
      closingHours: [{}],
    },
    {
      day: "friday",
      hours: [""],
      openingHours: [{}],
      closingHours: [{}],
    },
    {
      day: "saturday",
      hours: [""],
      openingHours: [{}],
      closingHours: [{}],
    },
    {
      day: "sunday",
      hours: [""],
      openingHours: [{}],
      closingHours: [{}],
    },
  ];

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
      timing: new FormGroup({
        0: new FormArray([]),
        1: new FormArray([]),
        2: new FormArray([]),
        3: new FormArray([]),
        4: new FormArray([]),
        5: new FormArray([]),
        6: new FormArray([]),
      }),
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
  openEditTimingModal(data: any) {
    this.modalService.open(data, {
      scrollable: true,
      size: "lg",
    });
  }

  // get select image
  getImage(event: any) {
    this.imageData = event.target.files[0];
  }
  // open edit outlet Modal
  openEditOutletModal(data: any, editOutlet: any) {
    this.editOutletForm.reset();

    this.modalService.open(data, {
      centered: true,
      scrollable: true,
      size: "lg",
    });

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
    editOutlet.openingHours[0].forEach((timing: any, index: any) => {
      let [openingHours, closingHours] = timing.split("-");
      if (openingHours[0] === '"') {
        openingHours = openingHours.slice(1, 6);
        closingHours = closingHours.slice(0, 6);
      } else {
        openingHours = openingHours.slice(0, 5);
        closingHours = closingHours.slice(0, 6);
      }
      let [opnHour, opnMin] = openingHours.split(":");
      let [clsHour, clsMin] = openingHours.split(":");
      this.daysList[0].openingHours[index] = { hour: Number(opnHour), minute: Number(opnMin) };
      this.daysList[0].closingHours[index] = { hour: Number(clsHour), minute: Number(clsMin) };
      this.daysList[0].hours[index] = timing;
    });
    editOutlet.openingHours[1].forEach((timing: any, index: any) => {
      let [openingHours, closingHours] = timing.split("-");
      if (openingHours[0] === '"') {
        openingHours = openingHours.slice(1, 6);
        closingHours = closingHours.slice(0, 6);
      } else {
        openingHours = openingHours.slice(0, 5);
        closingHours = closingHours.slice(0, 6);
      }
      let [opnHour, opnMin] = openingHours.split(":");
      let [clsHour, clsMin] = openingHours.split(":");
      this.daysList[1].openingHours[index] = { hour: Number(opnHour), minute: Number(opnMin) };
      this.daysList[1].closingHours[index] = { hour: Number(clsHour), minute: Number(clsMin) };
      this.daysList[1].hours[index] = timing;
    });
    editOutlet.openingHours[2].forEach((timing: any, index: any) => {
      let [openingHours, closingHours] = timing.split("-");
      if (openingHours[0] === '"') {
        openingHours = openingHours.slice(1, 6);
        closingHours = closingHours.slice(0, 6);
      } else {
        openingHours = openingHours.slice(0, 5);
        closingHours = closingHours.slice(0, 6);
      }
      let [opnHour, opnMin] = openingHours.split(":");
      let [clsHour, clsMin] = openingHours.split(":");
      this.daysList[2].openingHours[index] = { hour: Number(opnHour), minute: Number(opnMin) };
      this.daysList[2].closingHours[index] = { hour: Number(clsHour), minute: Number(clsMin) };
      this.daysList[2].hours[index] = timing;
    });
    editOutlet.openingHours[3].forEach((timing: any, index: any) => {
      let [openingHours, closingHours] = timing.split("-");
      if (openingHours[0] === '"') {
        openingHours = openingHours.slice(1, 6);
        closingHours = closingHours.slice(0, 6);
      } else {
        openingHours = openingHours.slice(0, 5);
        closingHours = closingHours.slice(0, 6);
      }
      let [opnHour, opnMin] = openingHours.split(":");
      let [clsHour, clsMin] = openingHours.split(":");
      this.daysList[3].openingHours[index] = { hour: Number(opnHour), minute: Number(opnMin) };
      this.daysList[3].closingHours[index] = { hour: Number(clsHour), minute: Number(clsMin) };
      this.daysList[3].hours[index] = timing;
    });
    editOutlet.openingHours[4].forEach((timing: any, index: any) => {
      let [openingHours, closingHours] = timing.split("-");
      if (openingHours[0] === '"') {
        openingHours = openingHours.slice(1, 6);
        closingHours = closingHours.slice(0, 6);
      } else {
        openingHours = openingHours.slice(0, 5);
        closingHours = closingHours.slice(0, 6);
      }
      let [opnHour, opnMin] = openingHours.split(":");
      let [clsHour, clsMin] = openingHours.split(":");
      this.daysList[4].openingHours[index] = { hour: Number(opnHour), minute: Number(opnMin) };
      this.daysList[4].closingHours[index] = { hour: Number(clsHour), minute: Number(clsMin) };
      this.daysList[4].hours[index] = timing;
    });
    editOutlet.openingHours[5].forEach((timing: any, index: any) => {
      let [openingHours, closingHours] = timing.split("-");
      if (openingHours[0] === '"') {
        openingHours = openingHours.slice(1, 6);
        closingHours = closingHours.slice(0, 6);
      } else {
        openingHours = openingHours.slice(0, 5);
        closingHours = closingHours.slice(0, 6);
      }
      let [opnHour, opnMin] = openingHours.split(":");
      let [clsHour, clsMin] = openingHours.split(":");
      this.daysList[5].openingHours[index] = { hour: Number(opnHour), minute: Number(opnMin) };
      this.daysList[5].closingHours[index] = { hour: Number(clsHour), minute: Number(clsMin) };
      this.daysList[5].hours[index] = timing;
    });
    editOutlet.openingHours[6].forEach((timing: any, index: any) => {
      let [openingHours, closingHours] = timing.split("-");
      if (openingHours[0] === '"') {
        openingHours = openingHours.slice(1, 6);
        closingHours = closingHours.slice(0, 6);
      } else {
        openingHours = openingHours.slice(0, 5);
        closingHours = closingHours.slice(0, 6);
      }
      let [opnHour, opnMin] = openingHours.split(":");
      let [clsHour, clsMin] = openingHours.split(":");
      this.daysList[6].openingHours[index] = { hour: Number(opnHour), minute: Number(opnMin) };
      this.daysList[6].closingHours[index] = { hour: Number(clsHour), minute: Number(clsMin) };
      this.daysList[6].hours[index] = timing;
    });

    this.editOutletForm.patchValue({
      outletName: editOutlet.outletName,
      preparationTime: editOutlet.preparationTime,
      cuisines: editOutlet.cuisines,
      outletImage: editOutlet.outletImage,
      shopAddress: editOutlet.shopAddress,
    });
  }

  addHour(mainIndex: any) {
    this.daysList[mainIndex].hours.push("");
    this.daysList[mainIndex].openingHours.push({});
    this.daysList[mainIndex].closingHours.push({});
  }
  removeHour(mainIndex: any, removingIndex: any) {
    this.daysList[mainIndex].hours.splice(removingIndex, 1);
    this.daysList[mainIndex].openingHours.splice(removingIndex, 1);
    this.daysList[mainIndex].closingHours.splice(removingIndex, 1);
  }
  concatHours(mainIndex: any, hourIndex: any) {
    if (this.daysList[mainIndex].openingHours[hourIndex] && this.daysList[mainIndex].closingHours[hourIndex]) {
      let { hour: opnHour, minute: opnMin } = this.daysList[mainIndex].openingHours[hourIndex];
      let { hour: clsHour, minute: clsMin } = this.daysList[mainIndex].closingHours[hourIndex];
      opnHour = opnHour < 10 ? `0${opnHour}` : opnHour;
      opnMin = opnMin < 10 ? `0${opnMin}` : opnMin;
      clsHour = clsHour < 10 ? `0${clsHour}` : clsHour;
      clsMin = clsMin < 10 ? `0${clsMin}` : clsMin;
      // Concatenate opening and closing hours
      this.daysList[mainIndex].hours[hourIndex] = `${opnHour}:${opnMin} - ${clsHour}:${clsMin}`;
    }
  }
  editOutletFormSubmit() {
    this.loading == true;
    this.editOutletForm.value.cuisines = this.cuisineArray;
    for (let index = 0; index < 7; index++) {
      this.editOutletForm.value.timing[index] = this.daysList[index].hours;
    }
    // this.submitted == true;
    if (this.editOutletForm.invalid) {
      this.loading = false;
      return;
    } else {
      const formData = new FormData();
      formData.append("outletName", this.editOutletForm.value.outletName);
      formData.append("preparationTime", this.editOutletForm.value.preparationTime);
      formData.append("cuisines", JSON.stringify(this.editOutletForm.value.cuisines));
      // formData.append("outletImage",this.imageData);
      formData.append("shopAddress", this.editOutletForm.value.shopAddress);
      formData.append("openingHours", JSON.stringify(this.editOutletForm.value.timing));

      if (this.imageData == undefined) {
        formData.append("outletImage", this.editOutletForm.value.outletImage);
      } else {
        formData.append("outletImage", this.imageData);
      }

      this.adminService.editOutletByOutletId(this.editOutletById, formData).subscribe((data: any) => {
        this.loading = false;
        if (data.status) {
          this.toastr.success(data.message, "Success!");
          this.modalService.dismissAll();
          this.editOutletForm.reset();
          this.daysList = [
            {
              day: "monday",
              hours: [""],
              openingHours: [{}],
              closingHours: [{}],
            },
            {
              day: "tuesday",
              hours: [""],
              openingHours: [{}],
              closingHours: [{}],
            },
            {
              day: "wednesday",
              hours: [""],
              openingHours: [{}],
              closingHours: [{}],
            },
            {
              day: "thursday",
              hours: [""],
              openingHours: [{}],
              closingHours: [{}],
            },
            {
              day: "friday",
              hours: [""],
              openingHours: [{}],
              closingHours: [{}],
            },
            {
              day: "saturday",
              hours: [""],
              openingHours: [{}],
              closingHours: [{}],
            },
            {
              day: "sunday",
              hours: [""],
              openingHours: [{}],
              closingHours: [{}],
            },
          ];
          this.allOutlet();
        } else {
          this.toastr.error(data.message, "error!");
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
        return "badge-light-success";
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
  verifyOutlet(status: any) {
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
    this.verificationStatus = seller.isVerified;
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
  navigateToMenuCheck(outletDetails: any) {
    this.router.navigate([`allOutlet/check-menu`], { queryParams: { oId: outletDetails.outletId } });
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

  openClose(status: Boolean) {
    return status ? "Open" : "Close";
  }
}
