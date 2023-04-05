import { Component, Input, OnInit } from "@angular/core";
import { Navigation, Router } from "@angular/router";
import { AdminService } from "app/services/admin.service";
import { NgbModal,NgbModalConfig } from '@ng-bootstrap/ng-bootstrap'; 

import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
})
export class CategoryComponent implements OnInit {
  editCategoryForm: FormGroup;
  hasSubCheck: Boolean = false;
  hasProdCheck: Boolean = false;
  submitted: Boolean = false;
  categoryList: any;
  tempCategory: any;
  editBycategory:any;
  productList:any;
  @Input() outletData: any;
  @Input() categoryData: any;
  constructor(private router: Router, private adminService: AdminService, private modalService: NgbModal,config: NgbModalConfig, private fb:FormBuilder, private toastr:ToastrService ) {}

  ngOnInit(): void {

    this.editCategoryForm = this.fb.group({
      categoryName: new FormControl(''),
      categoryId: new FormControl('')
    })
    this.outletData ? this.categoryByOutlet() : this.categoryByCatgeoryId();
    
    
  }

  get f(){
    return this.editCategoryForm.controls;
  }
  categoryByOutlet() {
    this.adminService.getCategory(this.outletData.outletId).subscribe((data: any) => {
      this.categoryList = data.items;
      
    });
  }

  subCategory(data: any) {
    this.tempCategory = data;
    this.hasSubCheck = data.hasSubCategory;
    this.hasProdCheck = !data.hasSubCategory;
    
    this.categoryByCatgeoryId();
  }

  categoryByCatgeoryId() {
  
    this.adminService.getSubcategory(this.categoryData.categoryId).subscribe((data: any) => {
        this.categoryList = data.items;
    });
  }

// open edit category modal
openeditCategorymodal(data:any,edit:any){
  this.modalService.open(data,{
    centered:true,
    scrollable:true,
    size:'md'
  })
  
  this.editBycategory = edit.categoryId
  
  this.editCategoryForm.patchValue({
    categoryName:edit.categoryName
    
  });
 
}

editCategoryFormSubmit(){
  this.submitted == true;
  if(this.editCategoryForm.invalid){
    return;
  }
  else{
    const formData = {
      "categoryId":this.editBycategory,
      "categoryName": this.editCategoryForm.value.categoryName

    }
    this.adminService.editcategory(formData).subscribe((data:any) => {
      if(data.status){
        this.toastr.success(data.message,"Success!")
        this.modalService.dismissAll();
        this.outletData ? this.categoryByOutlet() : this.categoryByCatgeoryId();
      }
      else{
        this.toastr.error(data.message,"Failed");
        this.modalService.dismissAll();
        this.outletData ? this.categoryByOutlet() : this.categoryByCatgeoryId();
      }
    })
  
  }
}
}
