import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { AdminService } from "../../../services/admin.service";
import { NgbActiveModal, NgbModal, NgbModalConfig, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { ColumnMode, DatatableComponent, SelectionType } from "@swimlane/ngx-datatable";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class OrderComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  public rows: any;
  public page = {
    totalElements: 50,
    pageNumber: 4,
    size: 10,
  };
  public sellerOutlet: any;
  public sellerDetail: any;
  private tempData = [];
  public ColumnMode = ColumnMode;
  public contentHeader: object;
  public orderStatus = "all";
  public basicSelectedOption: number = 5;
  public kitchenSinkRows = [];
  // config: NgbModalOptions;
  @ViewChild(OrderComponent) table: OrderComponent | any;
  @ViewChild("tableRowDetails") tableRowDetails: any;

  constructor(private adminService: AdminService, private modalService: NgbModal) {
    this._unsubscribeAll = new Subject();
  }

  /**
   * Search (filter)
   *
   * @param event
   */
  filterUpdate(event: any) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      console.log(d);
      
      return d.client.clientName.toLowerCase().indexOf(val) !== -1 || d.outlet.outletName.toLowerCase().indexOf(val) !== -1 ||  !val;
    });

    // update the rows
    this.kitchenSinkRows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  ngOnInit(): void {
    this.orderList(this.orderStatus);
  }

  orderList(status: string): any {
    this.adminService.getAllOrder(status).subscribe((response) => {
      if (response.status) {
        this.rows = response.items;
        this.kitchenSinkRows = this.rows;
        this.page.totalElements = this.rows.length;
        this.tempData = this.kitchenSinkRows;
      } else {
        this.rows = [];
        this.tempData = this.rows;
      }
    });
  }

  selectButtonClass(status: string): any {
    switch (status) {
      case "pending":
        return "badge-light-warning";
      case "preparing":
        return "badge-light-info";
      case "ready":
        return "badge-light-secondary";
      case "dispatched":
        return "badge-light-dark";
      case "delivered":
        return "badge-light-success";
      case "cancelled":
        return "badge-light-danger";
    }
  }
  changeStatus(status: string): any {
    this.orderStatus = status;
    this.ngOnInit();
  }
  getPageValue(event: any): any {
    console.log(event);
    this.page.pageNumber = event.offset;
    this.ngOnInit();
  }
}
