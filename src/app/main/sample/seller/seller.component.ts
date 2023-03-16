import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../../services/admin.service";
import { NgbActiveModal, NgbModal, NgbModalConfig, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { ColumnMode, DatatableComponent, SelectionType } from "@swimlane/ngx-datatable";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: "app-seller",
  templateUrl: "./seller.component.html",
  styleUrls: ["./seller.component.scss"],
})
export class SellerComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  public rows: any;
  public sellerOutlet: any;
  public sellerDetail: any;
  private tempData = [];
  public ColumnMode = ColumnMode;
  // config: NgbModalOptions;
  constructor(private adminService: AdminService, private modalService: NgbModal) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.sellerList();
  }

  showDetails(content: any, row: any): any {
    this.sellerDetail = row;
    this.sellersOutletList(row.sellerId);
    this.modalService.open(content, { size: "xl", centered: true });
  }

  sellerList(): any {
    this.adminService.getAllSeller().subscribe((response) => {
      if (response.status) {
        this.rows = response.items;
        this.tempData = this.rows;
      }
    });
  }

  sellersOutletList(sellerId: String): any {
    this.adminService.getSellersOutlet(sellerId).subscribe((response) => {
      if (response.status) {
        this.sellerOutlet = response.items;
      }
    });
  }
}
