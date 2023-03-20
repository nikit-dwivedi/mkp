import { AdminService } from './../../../services/admin.service';
import { Component, OnInit, ViewChild } from "@angular/core";
import { SelectionType, ColumnMode } from "@swimlane/ngx-datatable";

@Component({
  selector: "app-ticket",
  templateUrl: "./ticket.component.html",
  styleUrls: ["./ticket.component.scss"],
})
export class TicketComponent implements OnInit {
  public kitchenSinkRows: any;
  public SelectionType = SelectionType;
  public contentHeader: object;
  public rows: any;
  public sellerOutlet: any;
  public sellerDetail: any;
  public selected = [];
  private tempData = [];
  public ColumnMode = ColumnMode;
  public exportCSVData ;
  // config: NgbModalOptions;
  public basicSelectedOption: number = 5;
  // config: NgbModalOptions;
  @ViewChild(TicketComponent) table: TicketComponent | any;
  @ViewChild("tableRowDetails") tableRowDetails: any;
  constructor(private adminService: AdminService) {}
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.issue.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.kitchenSinkRows = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }
  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  onActivate(event) {
    // console.log('Activate Event', event);
  }
  ngOnInit(): void {
    this.getAllTicket("All")
  }

  getAllTicket(status:any){
    this.adminService.getAllTickets(status).subscribe((response) => {
      if (response.status) {
        this.rows = response.items;
        this.kitchenSinkRows = this.rows;
        this.tempData = this.rows;
      }
    });
  }
}
