import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from "../../../services/admin.service";
// import {  ToastrserviceService} from "../../../services/toastrservice.service";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { Router } from "@angular/router";
import { NgbModal,NgbModalConfig } from '@ng-bootstrap/ng-bootstrap'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-outlet',
  templateUrl: './all-outlet.component.html',
  styleUrls: ['./all-outlet.component.scss']
})
export class AllOutletComponent implements OnInit {

  public contentHeader: object;
  public rows: any;
  public sellerOutlet: any;
  public sellerDetail: any;
  private tempData = [];
  public ColumnMode = ColumnMode;
  // config: NgbModalOptions;
  public basicSelectedOption: number = 5;
  public kitchenSinkRows = [];
  allOutletList:any;
  status:any;
  outletDetails:any
  // config: NgbModalOptions;
  @ViewChild(AllOutletComponent) table: AllOutletComponent | any;
  @ViewChild("tableRowDetails") tableRowDetails: any;
  constructor(private adminService: AdminService, private router: Router, private toastr: ToastrService ,private modalService: NgbModal,config: NgbModalConfig) { }

  ngOnInit(): void {
    this.allOutlet();
  }
   
  allOutlet(){
    this.adminService.getAllOutlet().subscribe((data:any) => {
      this.allOutletList = data.items;
      this.rows = data.items;
      this.kitchenSinkRows = this.rows;
      this.tempData = this.rows;
    });
  }
  

  selectButtonClass(isClosed: boolean): any {
    switch (isClosed) {
      case true:
        return "badge-light-danger";
      case false:
        return "badge-light-info";
      
    }
  }

  // change outlet status
  changeOutletStatus(data:any,seller:any){
    this.modalService.open(data,{
      centered:true,
      scrollable:true,
      size:'lg'
    });
    this.status = seller.outletId;
   
    
  }

  onOffstatus(){

    this.adminService.changeStatus(this.status).subscribe((data:any)=>{
    
      if(data.status){
      this.toastr.success(data.message,"Succes!");
        this.allOutlet();
      }
      else{
    this.toastr.error(data.message,"error!");
  }
    })
  }

  navigateToDetail(outletDetails:any){
    this.router.navigate(["menu"], { state: { outletDetails } });
    
    
  }

  filterUpdate(event: any) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.outletName?.toLowerCase().indexOf(val) !== -1 || d.outletId?.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.kitchenSinkRows = temp;
    // Whenever the filter changes, always go back to the first page
    
  }
}

