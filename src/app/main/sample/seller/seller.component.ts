import { Component, OnInit, ViewChild } from "@angular/core";
import { AdminService } from "../../../services/admin.service";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { Router } from "@angular/router";

@Component({
  selector: "app-seller",
  templateUrl: "./seller.component.html",
  styleUrls: ["./seller.component.scss"],
})
export class SellerComponent implements OnInit {
  public contentHeader: object;
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
  constructor(private adminService: AdminService, private router:Router) {}

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
