import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../../services/admin.service";
import { NgbActiveModal, NgbModal, NgbModalConfig, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { ColumnMode, DatatableComponent, SelectionType } from "@swimlane/ngx-datatable";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.scss"],
})
export class OrderComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  public rows: any;
  public sellerOutlet: any;
  public sellerDetail: any;
  private tempData = [];
  public ColumnMode = ColumnMode;
  public contentHeader: object;
  public orderStatus = "all";
  // config: NgbModalOptions;
  constructor(private adminService: AdminService, private modalService: NgbModal) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.orderList(this.orderStatus);
  }

  orderList(status: string): any {
    this.adminService.getAllOrder(status).subscribe((response) => {
      if (response.status) {
        this.rows = response.items;
        this.tempData = this.rows;
      }else{
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
  changeStatus(status:string):any{
    this.orderStatus = status
    this.ngOnInit()
  }
}
