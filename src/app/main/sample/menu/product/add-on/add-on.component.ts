import { Component, OnInit,Input, ViewChild } from '@angular/core';
import { ColumnMode } from "@swimlane/ngx-datatable";
import { NgbModal,NgbModalConfig } from '@ng-bootstrap/ng-bootstrap'; 
import { AdminService } from 'app/services/admin.service';
import { FormGroup, FormBuilder,FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-on',
  templateUrl: './add-on.component.html',
  styleUrls: ['./add-on.component.scss']
})
export class AddOnComponent implements OnInit {
  public contentHeader: object;
  public rows: any;
  public rows1: any;
  public rows2: any;
  private tempData = [];
  private tempData1 = [];
  private tempData2 = [];
  public ColumnMode = ColumnMode;
  public basicSelectedOption: number = 5;
  public basicSelectedOption1: number = 5;
  public basicSelectedOption2: number = 5;
  public kitchenSinkRows = [];
  public kitchenSinkRows1 = [];
  public kitchenSinkRows2 = [];

  @Input() productData:any;

  @ViewChild(AddOnComponent) table: AddOnComponent | any;
  @ViewChild("tableRowDetails") tableRowDetails: any;
  editAddonCategoryForm:FormGroup
  outletAddonList: any;
  productAddonList: any;
  viewByCategoryId: any;
  categoryAddonList: any;
  editCategory: any;
  submitted:Boolean = false;
  constructor(private AdminService:AdminService,private modalService: NgbModal, config: NgbModalConfig, private fb:FormBuilder , private toastr:ToastrService) { }

  ngOnInit(): void {
    console.log("Product Data",this.productData);
    this.productAddonCategory();
    this.outletAddonCategory();
    
    this.editAddonCategoryForm = this.fb.group({
      categoryName: new FormControl(''),
      minSelection: new FormControl(''),
      maxSelection: new FormControl('')
    });
  }

  get b() {
    return this.editAddonCategoryForm.controls;
  }

  outletAddonCategory(){
    this.AdminService.getOutletAddon(this.productData.outletId).subscribe((data:any) => {
      this.outletAddonList = data.items;
      this.rows = data.items;
      this.kitchenSinkRows = this.rows;
      this.tempData = this.rows;
    });
  }

  productAddonCategory(){
    this.AdminService.getProductAddon(this.productData.productId).subscribe((data:any) => {
      this.productAddonList = data.items;
      this.rows1 = data.items;
      this.kitchenSinkRows1 = this.rows1;
      this.tempData1 = this.rows1;

      console.log(" Product Add on is here",this.productAddonList);
      
    })
  }


  // open view addon by addOnCategoryId modal
  openviewAddonModal(data:any,view:any){
    this.modalService.open(data,{
      centered:true,
      scrollable:true,
      size:'xl'
    })
    this.viewByCategoryId = view;
    console.log("this.viewByCategoryId",this.viewByCategoryId.addOnCategoryId);
    
    this.AdminService.getAddonByaddOnCategoryId(this.viewByCategoryId.addOnCategoryId).subscribe((data:any) => {
      this.categoryAddonList = data.items;
      this.rows2 = data.items;
      this.kitchenSinkRows2 = this.rows2;
      this.tempData = this.rows2;

      console.log("Data", this.categoryAddonList);
      
    })
  }

// open edit addon category modal
openEditAddoncategoryModal(data:any,edit:any){
  this.modalService.open(data,{
    centered:true,
    scrollable:true,
    size:'lg'
  })
  this.editCategory = edit;

  console.log("this.editCategory",this.editCategory);

  this.editAddonCategoryForm.patchValue({
    categoryName:edit.categoryName,
    minSelection:edit.minSelection,
    maxSelection:edit.maxSelection
  })
}

editAddonCategoryFormSubmit(){
  this.submitted = true;
  if(this.editAddonCategoryForm.invalid){
    return
  }
  else{
    const formData = {
      addOnCategoryId: this.editCategory.addOnCategoryId,
      categoryName: this.editAddonCategoryForm.value.categoryName,
      minSelection: this.editAddonCategoryForm.value.minSelection,
      maxSelection: this.editAddonCategoryForm.value.maxSelection
    }

    this.AdminService.editAddonCategory(formData).subscribe((data:any) => {
      if(data.status){
        this.toastr.success(data.message,"Success!");
        this.editAddonCategoryForm.reset();
        this.outletAddonCategory();
      }
      else{
        this.toastr.error(data.message,"failed");
      }
    })
  }
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
