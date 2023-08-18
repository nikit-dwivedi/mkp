import { Component, OnInit, ViewChild } from "@angular/core";
import { AdminService } from "../../../services/admin.service";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-seller",
  templateUrl: "./seller.component.html",
  styleUrls: ["./seller.component.scss"],
})
export class SellerComponent implements OnInit {
  public contentHeader: object;
  private isSubmitted: Boolean = false;
  public rows: any;
  public sellerOutlet: any;
  public sellerDetail: any;
  private tempData = [];
  public ColumnMode = ColumnMode;
  // config: NgbModalOptions;
  public basicSelectedOption: number = 5;
  public kitchenSinkRows = [];
  // config: NgbModalOptions;
  @ViewChild(SellerComponent) table: SellerComponent | any;
  @ViewChild("tableRowDetails") tableRowDetails: any;
  addContractForm: any;
  constructor(private adminService: AdminService, private router: Router, private modalService: NgbModal, private fb: FormBuilder, private toastr: ToastrService) {}

  /**
   * Search (filter)
   *
   * @param event
   */
  filterUpdate(event: any) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.basicDetails.sellerName?.toLowerCase().indexOf(val) !== -1 || d.basicDetails.phone?.toLowerCase().indexOf(val) !== -1 || d.sellerId?.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.kitchenSinkRows = temp;
    // Whenever the filter changes, always go back to the first page
  }

  ngOnInit(): void {
    this.sellerList();
    this.contentHeader = {
      headerTitle: "Seller",
      actionButton: true,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "List",
            isLink: false,
          },
        ],
      },
    };
  }

  openContractModal(data: any, sellerId: any) {
    this.addContractForm = this.fb.group({
      sellerId: [sellerId, Validators.required],
      contract: ["", Validators.required],
    });
    this.modalService.open(data, {
      centered: true,
      scrollable: true,
      size: "sm",
    });
  }

  get contractFormControls() {
    return this.addContractForm.controls;
  }

  submitContractForm() {
    this.isSubmitted = true;
    if (this.addContractForm.invalid) {
      return;
    }
    let bodyData = {
      sellerId: this.addContractForm.value.sellerId,
      contract: this.addContractForm.value.contract,
    };
    this.isSubmitted = false;
    this.addContractToSeller(bodyData);
    this.modalService.dismissAll();
  }

  addContractToSeller(bodyData: any): any {
    this.adminService.addContract(bodyData).subscribe((response) => {
      if (!response.status) {
        this.toastr.error(response.message, "Error");
        return;
      }
      this.toastr.success(response.message, "success");
      this.sellerList();
    });
  }

  openPdf(contract: any) {
    if (!contract || contract === "") {
      this.toastr.error("Please upload contract first", "Error");
      return
    }
    window.open(contract, "_blank");
  }

  sellerList(): any {
    this.adminService.getAllSeller().subscribe((response) => {
      if (response.status) {
        this.rows = response.items;
        this.kitchenSinkRows = this.rows;
        this.tempData = this.rows;
      }
    });
  }

  navigateToDetail(sellerDetail: any): any {
    this.router.navigate(["seller/detail"], { state: { sellerDetail } });
  }
}
