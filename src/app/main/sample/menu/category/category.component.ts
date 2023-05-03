import { Component, Input, OnInit } from "@angular/core";
import { Navigation, Router } from "@angular/router";
import { AdminService } from "app/services/admin.service";
import { NgbModal,NgbModalConfig } from '@ng-bootstrap/ng-bootstrap'; 
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ProductComponent } from "../product/product.component";


@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
})
export class CategoryComponent implements OnInit {
  editCategoryForm: FormGroup;
  addCategoryForm: FormGroup;
  hasSubCheck: Boolean = false;
  hasProdCheck: Boolean = false;
  hasNothing:Boolean = false;
  submitted: Boolean = false;
  categoryList: any;
  tempCategory: any;
  editBycategory:any;
  productList:any;
  bothCheck:any;
  
  @Input() outletData: any;
  @Input() categoryData: any;
  deleteByCategoryId: any;
  
  constructor(private router: Router, private adminService: AdminService, private modalService: NgbModal,config: NgbModalConfig, private fb:FormBuilder, private toastr:ToastrService ) {}

  ngOnInit(): void {
    this.outletData ? this.categoryByOutlet() : this.categoryByCatgeoryId();
    
    
    
  // add category name
    this.addCategoryForm = this.fb.group({
      categoryName: new FormControl(''),
      
    });

    // edit category form
    this.editCategoryForm = this.fb.group({
      categoryName: new FormControl(''),
      categoryId: new FormControl('')
    });
   }

   ngOnChanges(){
    this.outletData ? this.categoryByOutlet() : this.categoryByCatgeoryId();
    
   }
    
   get f(){
    return this.addCategoryForm.controls
   }

  get b(){
    return this.editCategoryForm.controls;
  }

  categoryByOutlet() {
    this.adminService.getCategory(this.outletData.outletId).subscribe((data: any) => {
      this.categoryList = data.items;
      this.productCheck();
    });
    
  }

  subCategory(data: any){
    data.outletId = this.outletData?this.outletData.outletId:this.categoryData.outletId
   
    this.tempCategory = data;
    this.hasSubCheck = data.hasSubCategory;
    this.hasProdCheck = !data.hasSubCategory;
    this.hasNothing =  !this.hasSubCheck && !this.hasProdCheck?true:false;
    // console.log("nothing",this.hasNothing,"prd",this.hasProdCheck,"dub",this.hasSubCheck);
    // this.productCheck();
    // this.hasProdCheck = false;
    if(!this.hasSubCheck){
      this.hasProdCheck == false;
    }

}
  
  categoryByCatgeoryId(){
    // this.productCheck();
     this.adminService.getSubcategory(this.categoryData?.categoryId).subscribe((data: any) => {
       this.categoryList = data.items;
       this.productCheck();
      });
   }

// product Check
productCheck(){
  this.adminService.getProductBycategory(this.categoryData?.categoryId).subscribe((data: any) => {
     if (data.status) {
      this.productList = data.items;
 }
  });
}




// open add category modal
openAddCategoryModal(data:any){
  this.modalService.open(data,{
    centered:true,
    scrollable:true,
    size:'lg',
    windowClass: 'custom-class'
  });
}

addCategoryFormSubmit(){
  if(this.addCategoryForm.invalid){
    return;
  }
  else{
    const bodyData = {
      "categoryName": this.addCategoryForm.value.categoryName,
      "outletId": this.outletData?.outletId??this.categoryData.outletId,
      "parentCategoryId": this.categoryData?.categoryId ?? "" 
    }

    this.adminService.addCategory(bodyData).subscribe((data:any) => {
      if(data.status){
        this.toastr.success(data.message,"Success!");
        this.modalService.dismissAll();
        this.outletData ? this.categoryByOutlet() : this.categoryByCatgeoryId();
        this.addCategoryForm.reset();
      }
      else{
        this.toastr.error(data.message,"failed")
      }
    });
  }
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

// open delete category modal
openDeleteCategoryModal(data:any,category:any){
  this.modalService.open(data,{
    centered:true,
    scrollable:true,
    size:'lg'
  });

  this.deleteByCategoryId = category.categoryId

}
deleteCategory(){
  const body ={
    categoryId:this.deleteByCategoryId
  }

  this.adminService.deleteData(body).subscribe((data:any) => {
    if(data.status){
      this.toastr.success(data.message,"Success!");
      this.categoryByOutlet();
      this.categoryByCatgeoryId();
      this.modalService.dismissAll();
  }
    else{
      this.toastr.error(data.message,"error!");
    }
  });
}

}

