import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { AdminService } from "app/services/admin.service";
import * as moment from "moment";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"],
})
export class PaymentComponent implements OnInit {
  public contentHeader: object;
  public rows: any;
  public sellerOutlet: any;
  public sellerDetail: any;
  private tempData = [];
  public ColumnMode = ColumnMode;
  // config: NgbModalOptions;
  public basicSelectedOption: number = 10;
  public kitchenSinkRows = [];
  paymentList: any;
  currentDate: any;
  startDate: string;
  endDate: string;
  // config: NgbModalOptions;
  constructor(private adminService: AdminService, private router: Router) {}
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
    var from = new Date();
    from.setDate(from.getDate() - 5);
    this.startDate = moment(from).format("MM-DD-YYYY");
    this.endDate = moment(new Date()).format("MM-DD-YYYY");
    this.getAllPaymentlist();
  }

  getStartDate(event: any) {
    var from = event.target.value;
    this.startDate = moment(from).format("MM-DD-YYYY");
  }

  getEndDate(event: any) {
    var to = event.target.value;
    this.endDate = moment(to).format("MM-DD-YYYY");
    this.getAllPaymentlist();
  }

  getAllPaymentlist() {
    this.adminService.getPaymentDetails(this.startDate, this.endDate).subscribe((data: any) => {
      this.paymentList = data.items;
      this.kitchenSinkRows = this.paymentList;
      this.tempData = this.paymentList;
    });
  }
}
