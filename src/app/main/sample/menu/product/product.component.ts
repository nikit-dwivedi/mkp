import { Component, OnInit, Input } from "@angular/core";
import { AdminService } from "app/services/admin.service";
import { NgbModal,NgbModalConfig } from '@ng-bootstrap/ng-bootstrap'; 
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { log } from "console";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit {
  submitted:Boolean = false;
  productList: any;
  editProduct:any;
  editProductForm:FormGroup
  @Input() categoryData: any;
  constructor(private adminService: AdminService, private modalService: NgbModal,config: NgbModalConfig, private fb:FormBuilder) {}

  ngOnInit(): void {
    this.productByCatgeoryId();
    this.editProductForm = this.fb.group({
      productName: new FormControl(''),
      productPrice: new FormControl('')
    })
  }

  get f(){
   return this.editProductForm.controls
  }
  
  productByCatgeoryId() {
    
    
    this.adminService.getProductBycategory(this.categoryData.categoryId).subscribe((data: any) => {
      // if (data.status) {
      //   this.productList = data.items;
      // }   
      this.productList = data.items;
    });
  }

  

  // open edit product modal
   openEditProductModal(data:any,edit:any){
    this.modalService.open(data,{
      centered:true,
      scrollable:true,
      size:'lg'
    
    });
    this.editProduct = edit.productId
    
    this.editProductForm.patchValue({
      productName:edit.productName,
      productPrice:edit.productPrice
    });
  }

  //  edit product form submit
   editProductFormSubmit(){
    this.submitted == true;
    if(this.editProductForm.invalid){
      return;
    }
    else{
      const formData = {
        "productName": this.editProductForm.value.productName,
        "productPrice":this.editProductForm.value.productPrice
      }

      console.log("formData========>",formData);
      
    }
   }

}
