import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AdminService } from "app/services/admin.service";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-menu-check",
  templateUrl: "./menu-check.component.html",
  styleUrls: ["./menu-check.component.scss"],
})
export class MenuCheckComponent implements OnInit {
  public outletId: any;
  public menuList: any;
  public currentIndex: any;
  public lastIndex: any;
  editProductForm: FormGroup;
  addProductForm:FormGroup;
  editCategoryForm:FormGroup;
  addCategoryForm:FormGroup;
  submitted: Boolean = false;
  imageData: any;
  previousImage: any;
  checkveg: any;
  newImage: any;
  editProduct:any;
  product:any;
  addProduct:any;
  editCategory:any;
  categoryData:any;
  deleteCategory: any;
  constructor(private _route: ActivatedRoute, private modalService: NgbModal, private toastr:ToastrService ,config: NgbModalConfig, private fb: FormBuilder, private _router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    if (!this._route.snapshot.queryParams["oId"]) {
      this._router.navigate(["allOutlet"]);
    }
    this.outletId = this._route.snapshot.queryParams["oId"];
    console.log("this.outletId======>",this.outletId);
    
    this.getFullMenu();
    // edit product form
    this.editProductForm = this.fb.group({
      productName: new FormControl(""),
      productPrice: new FormControl(""),
      productImage: new FormControl(""),
      isVeg: new FormControl(""),
      productDesc: new FormControl("")
    });

    // add product form
    this.addProductForm = this.fb.group({
      productName: new FormControl(""),
      productPrice: new FormControl(""),
      productDesc: new FormControl(""),
      productImage: new FormControl(""),
      isVeg: new FormControl(""),
    });

  // edit category form
    this.editCategoryForm = this.fb.group({
      categoryName: new FormControl(''),
      categoryId: new FormControl('')
    });

    // add category form
    this.addCategoryForm = this.fb.group({
      categoryName: new FormControl(''),
    });
  }

  get f() {
    return this.addProductForm.controls;
  }

  get b() {
    return this.editProductForm.controls;
  }

  getFullMenu() {
    this.adminService.getFullMenu(this.outletId).subscribe((data) => {
      if (!data.status) {
        this.menuList = [];
      }
      this.menuList = data.items;
      this.currentIndex = 1;
      this.lastIndex = this.menuList.length;
      console.log(this.menuList);
    });
  }
  changeIndex(add: Boolean) {
    if (!add) {
      console.log("false triggered");
      this.currentIndex -= 1;
      return
    }
    this.currentIndex += 1;
  }
 openEditProductModal(data: any, edit: any) {
    this.modalService.open(data, {
      centered: true,
      scrollable: true,
      size: "lg",
    });
    this.editProduct = edit.productId;
    this.previousImage = edit.productImage;
    this.editProductForm.patchValue({
      productName: edit.productName,
      productPrice: edit.productPrice,
      isVeg: edit.isVeg,
      productDesc:edit.productDesc
    });
  }

  changeImage(event: any) {
    this.imageData = event.target.files[0];
  }
  editProductFormSubmit() {
    this.submitted = true;
    if (this.editProductForm.invalid) {
      return;
    } else {
      this.checkveg = JSON.parse(this.editProductForm.value.isVeg)
      const formData = new FormData();
      formData.append("productName", this.editProductForm.value.productName);
      formData.append("productPrice", this.editProductForm.value.productPrice);
      formData.append("productDesc", this.editProductForm.value.productDesc);
      formData.append("isVeg", this.checkveg);
      if (this.imageData == undefined) {
        formData.append("productImage", this.previousImage)
      }
      else {
        formData.append("productImage", this.imageData);
      }

      this.adminService.editProductbyId(this.editProduct,formData).subscribe((res:any)=>{
        if(res.status){
          this.toastr.success(res.message,"Success!");
          this.modalService.dismissAll();
          this.getFullMenu();
        }else{
          this.toastr.error(res.message,"error!");
          this.getFullMenu();
        }
      })
}
  }

  openDeleteProductModal(data:any,product:any){
    this.modalService.open(data, {
      centered: true,
      scrollable: true,
      size: "lg",
    });
    this.product = product
}

openDeleteCategoryModal(data:any,category:any){
  this.modalService.open(data, {
    centered: true,
    scrollable: true,
    size: "lg",
  });
  this.deleteCategory = category.categoryId;
}



deleteProduct(){
const formData ={
  productId:this.product.productId
}
  this.adminService.deleteData(formData).subscribe((res:any)=>{
    if(res.status){
      this.toastr.success(res.message,"Success!");
      this.getFullMenu();
      this.modalService.dismissAll();
    }else{
      this.toastr.error(res.message,"error!");
      this.getFullMenu();
    }
  })
}

deleteCategories(){
  const formData ={
    categoryId:this.deleteCategory
  }
    this.adminService.deleteData(formData).subscribe((res:any)=>{
      if(res.status){
        this.toastr.success(res.message,"Success!");
        this.getFullMenu();
        this.modalService.dismissAll();
      }else{
        this.toastr.error(res.message,"error!");
        this.getFullMenu();
      }
    })
}

openAddProductModal(data:any,addProduct:any){
  this.modalService.open(data,{
    centered:true,
    scrollable:true,
    size:'lg'
  });
  this.addProduct = addProduct
}

addProductFormSubmit() {
  this.submitted = true;
  if (this.addProductForm.invalid) {
    return;
  } else {
    const formData = new FormData();
    formData.append("parentCategoryId", this.addProduct.categoryId);
    formData.append("productName", this.addProductForm.value.productName);
    formData.append("productPrice", this.addProductForm.value.productPrice);
    formData.append("productDesc", this.addProductForm.value.productDesc);
    if (this.imageData) {
      formData.append("productImage", this.imageData);
    }
    formData.append("isVeg", this.addProductForm.value.isVeg ?? false);

    this.adminService.addProduct(formData).subscribe((data: any) => {
      if (!data.status) {
        this.toastr.error(data.message, "failed");
        this.getFullMenu();
      }
      this.toastr.success(data.message, "Success!");
      this.modalService.dismissAll();
      this.addProductForm.reset();
      this.getFullMenu();
      this.imageData = null;
    });
  }
}

openeditCategorymodal(data:any,category:any){
  this.modalService.open(data,{
    centered:true,
    scrollable:true,
    size:'md'
  });
  this.editCategory = category;
  console.log(this.editCategory);
  
  this.editCategoryForm.patchValue({
    categoryName:category.categoryName
    
  });
}

editCategoryFormSubmit(){
  this.submitted == true;
  if(this.editCategoryForm.invalid){
    return;
  }
  else{
    const formData = {
      "categoryId":this.editCategory.categoryId,
      "categoryName": this.editCategoryForm.value.categoryName
    }
    this.adminService.editcategory(formData).subscribe((data:any) => {
      console.log(formData);
      
      if(data.status){
        this.toastr.success(data.message,"Success!")
        this.getFullMenu();
        this.modalService.dismissAll();
      }
      else{
        this.toastr.error(data.message,"Failed");
        this.getFullMenu();
        this.modalService.dismissAll();
       
      }
    })
  
  }
}

openAddCategoryModal(data:any,categoryData:any){
  this.modalService.open(data,{
    centered:true,
    scrollable:true,
    size:'lg'
  });
  this.categoryData = categoryData;
}

addCategoryFormSubmit(){
  if(this.addCategoryForm.invalid){
    return;
  }
  else{
    const bodyData = {
      "categoryName": this.addCategoryForm.value.categoryName,
      "outletId": this.outletId??this.categoryData.outletId,
      "parentCategoryId": this.categoryData?.categoryId ?? "" 
    }

    this.adminService.addCategory(bodyData).subscribe((data:any) => {
      if(data.status){
        this.toastr.success(data.message,"Success!");
        this.getFullMenu();
        this.modalService.dismissAll();
        this.addCategoryForm.reset();
      }
      else{
        this.toastr.error(data.message,"failed");
        this.getFullMenu();
      }
    });
  }

}
}