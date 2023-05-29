import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AdminService } from 'app/services/admin.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

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
  }
  paymentList(): any {
    this.adminService.getAllSeller().subscribe((response) => {
      if (response.status) {
        this.rows = response.items;
        this.kitchenSinkRows = this.rows;
        this.tempData = this.rows;
      }
    });
  }

}
