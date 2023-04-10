import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AdminService } from "app/services/admin.service";
import { NgbModal,NgbModalConfig } from '@ng-bootstrap/ng-bootstrap'; 
import { ColumnMode } from "@swimlane/ngx-datatable";
import { FormGroup,FormBuilder, Validators, FormControl, } from '@angular/forms';
@Component({
  selector: 'app-customization',
  templateUrl: './customization.component.html',
  styleUrls: ['./customization.component.scss']
})
export class CustomizationComponent implements OnInit {
  public contentHeader: object;
  public rows: any;
  public sellerOutlet: any;
  public sellerDetail: any;
  private tempData = [];
  public ColumnMode = ColumnMode;

  public basicSelectedOption: number = 5;
  public kitchenSinkRows = [];

  @ViewChild(CustomizationComponent) table: CustomizationComponent | any;
  @ViewChild("tableRowDetails") tableRowDetails: any;
  editCustomizationForm: FormGroup | any;
  customizationList:any;
  customizeById:any;
  @Input() productData:any;

  constructor(private adminService: AdminService, private modalService: NgbModal,config: NgbModalConfig,private fb:FormBuilder) { }

  ngOnInit(): void {
    
    console.log("Product Data=======>",this.productData.productId);
    this.getCustomization();  
}
 
 getCustomization(){
  this.adminService.getProductCustomization(this.productData.productId).subscribe((data:any) => {
    this.customizationList = data.items.variantList;
    console.log("Customization List",this.customizationList);

    this.rows = data.items?.variantList;
    this.kitchenSinkRows = this.rows;
    this.tempData = this.rows;
  })
 }

//  open EditCustomization Modal
openEditCustomizationModal(data:any,edit:any){
  this.modalService.open(data,{
    centered:true,
    scrollable:true,
    size:'lg'
  });
  this.customizeById = edit;
  console.log(this.customizeById);
  
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
