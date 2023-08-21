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
  submitted:Boolean = false;
  editAddonCategoryForm:FormGroup;
  addAddonCategoryForm:FormGroup;
  editAddonProductForm:FormGroup;
  addAddonProductForm:FormGroup;
  outletAddonList: any;
  productAddonList: any;
  viewByCategoryId: any;
  categoryAddonList: any;
  editCategory: any;
  addCategory:any;
  addonProduct:any
  editAddonProduct: any;
  linkById:any;
  unLinkById:any;
  product:any;
  constructor(private AdminService:AdminService,private modalService: NgbModal, config: NgbModalConfig, private fb:FormBuilder , private toastr:ToastrService) { }

  ngOnInit(): void {
    
    this.productAddonCategory();
    this.outletAddonCategory();

    // edit addon category form
    this.editAddonCategoryForm = this.fb.group({
      categoryName: new FormControl(''),
      minSelection: new FormControl(''),
      maxSelection: new FormControl('')
    });

    // add addon category form
    this.addAddonCategoryForm = this.fb.group({
      categoryName: new FormControl(''),
      minSelection: new FormControl(''),
      maxSelection: new FormControl('')
    });

    // edit addon product form
    this.editAddonProductForm = this.fb.group({
      productName: new FormControl(''),
      productPrice: new FormControl('')
    });

    // add addon product form
    this.addAddonProductForm = this.fb.group({
      productName: new FormControl(''),
      productPrice: new FormControl('')
    });
 }

  get a() {
    return this.addAddonCategoryForm.controls;
  }

  get b() {
    return this.editAddonCategoryForm.controls;
  }

  get c() {
    return this.editAddonProductForm.controls;
  }

  get d() {
    return this.addAddonProductForm.controls;
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
   });
  }


  // open view addon Product by addOnCategoryId modal
  openviewAddonModal(data:any,view:any){
    
    this.modalService.open(data,{
      centered:true,
      scrollable:true,
      size:'xl'
    });

    this.viewByCategoryId = view;
    this.viewProductDetails();
   
  }

  viewProductDetails(){
    this.addonProduct = this.viewByCategoryId.productList;
    this.rows2 = this.viewByCategoryId.productList;
    this.kitchenSinkRows2 = this.rows2;
    this.tempData = this.rows2;
  }
 

  // open add addon category modal
  openAddAddonCategoryModal(data:any){
    this.modalService.open(data,{
      centered:true,
      scrollable:true,
      size:'lg'
    });
    
  }

  addAddonCategoryFormSubmit(){
    this.submitted = true;
    if(this.addAddonCategoryForm.invalid){
      return;
    }
    else{
      const formData = {
        outletId: this.productData.outletId,
        categoryName: this.addAddonCategoryForm.value.categoryName,
        minSelection: this.addAddonCategoryForm.value.minSelection,
        maxSelection: this.addAddonCategoryForm.value.maxSelection
      }

      

      this.AdminService.addAddonCategory(formData).subscribe((data:any) => {
       if(data.status){
          this.toastr.success(data.message,"Success!");
          this.outletAddonCategory();
          this.addAddonCategoryForm.reset();
        }
        else{
          this.toastr.error(data.message,"failed")
        }
      })
    }
  }
// open edit addon category modal
openEditAddoncategoryModal(data:any,edit:any){
  this.modalService.open(data,{
    centered:true,
    scrollable:true,
    size:'lg'
  })
  this.editCategory = edit;
  
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

// open edit adon product Modal
openEditAddonProductModal(data:any,editProduct:any){
  this.modalService.open(data,{
    centered:true,
    scrollable:true,
    size:'lg'
  });
  this.editAddonProduct =  editProduct

  
  this.editAddonProductForm.patchValue({
    productName:editProduct.productName,
    productPrice:editProduct.productPrice
  });
}

editAddonProductFormSubmit(){
  this.submitted = true;
  if(this.editAddonProductForm.invalid){
    return;
  }
  else{
    const formData = {
      addOnProductId:this.editAddonProduct.addOnProductId,
      productName:this.editAddonProductForm.value.productName,
      productPrice:this.editAddonProductForm.value.productPrice
    }

    this.AdminService.editAddonProduct(formData).subscribe((data:any) => {
      if(data.status){
        this.toastr.success(data.message,"Success!");
        this.editAddonProductForm.reset();
        this.viewProductDetails();
        
        // window.location.reload();
        
      }
      else{
        this.toastr.error(data.message,"failed");
      }
    })
  }
}

// open add addon product Modal
openAddAddonProductModal(data:any){
   this.modalService.open(data,{
    centered:true,
    scrollable:true,
    size:'lg'
  });
}

addAddonProductFormSubmit(){
  this.submitted = true;
  if(this.addAddonProductForm.invalid){
    return;
  }
  else{
    const formData = {
      addOnCategoryId:this.viewByCategoryId.addOnCategoryId,
      productName:this.addAddonProductForm.value.productName,
      productPrice:this.addAddonProductForm.value.productPrice
    }
   
    this.AdminService.addAddonProduct(formData).subscribe((data:any) => {
      if(data.status){
        this.toastr.success(data.message,"Success!");
        this.addAddonProductForm.reset();
        this.outletAddonCategory();
      }
      else{
        this.toastr.error(data.message,"failed");
        this.outletAddonCategory();
      }
    })
  }
}

// open link addpn to product Modal
openLinktoProductModal(data:any,link:any){
  this.modalService.open(data,{
    centered:true,
    scrollable:true,
    size:'lg'
  });
  this.linkById = link
}

linkAddon(){
  const formData = {
    productId:this.productData.productId,
    addOnCategoryId:this.linkById.addOnCategoryId,
    operation:true
  }

  this.AdminService.linkUnlink(formData).subscribe((data:any) => {
    if(data.status){
      this.toastr.success(data.message,"Success!");
      this.productAddonCategory();
    }
    else{
      this.toastr.error(data.message,"failed");
      this.productAddonCategory();
    }
  });
}

// open unlink adddon from product addon Modal
openUlinkAddonModal(data:any,unlink:any){
  this.modalService.open(data,{
    centered:true,
    scrollable:true,
    size:'lg'
  });

  this.unLinkById = unlink;
}

unLinkAddon(){
  const formData = {
    productId:this.productData.productId,
    addOnCategoryId:this.unLinkById.addOnCategoryId,
    operation: false
  }

  
  this.AdminService.linkUnlink(formData).subscribe((data:any) => {
    if(data.status){
      this.toastr.success(data.message);
      this.productAddonCategory();
    }
    else{
      this.toastr.error(data.message,"failed");
    }
  })
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
