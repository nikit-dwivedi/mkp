import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from "../../../services/admin.service";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { Router } from "@angular/router";
@Component({
  selector: 'app-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.scss']
})
export class OutletComponent implements OnInit {
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
  @ViewChild(OutletComponent) table: OutletComponent | any;
  @ViewChild("tableRowDetails") tableRowDetails: any;
  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    console.log("=============");
    
  }

  filterUpdate(event: any) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {

      // return d.basicDetails.sellerName?.toLowerCase().indexOf(val) !== -1 || d.basicDetails.phone?.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.kitchenSinkRows = temp;
    // Whenever the filter changes, always go back to the first page
    
  }
}
