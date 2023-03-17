import { AdminService } from "./../../../../services/admin.service";
import { Navigation, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormGroup, UntypedFormBuilder, Validators } from "@angular/forms";
import { FileUploader } from "ng2-file-upload";

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
  public uploader: FileUploader = new FileUploader({
    url: URL,
  });

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

  constructor(private router: Router, private adminService: AdminService, private formBuilder: UntypedFormBuilder) {
    let nav: Navigation = this.router.getCurrentNavigation();
    if (nav.extras && nav.extras.state && nav.extras.state.sellerDetail) {
      this.sellerDetail = nav.extras.state.sellerDetail;
    } else {
      this.router.navigate(["seller"]);
    }
  }

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

  get ReactiveUDForm() {
    return this.outletForm.controls;
  }

  ReactiveUDFormOnSubmit() {
    this.outletFormSubmitted = true;
    // stop here if form is invalid
    if (this.outletForm.invalid) {
      return;
    }
    let bodyData = { sellerId: this.sellerDetail.sellerId, ...this.outletForm.value };
    console.log(event);

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
}
