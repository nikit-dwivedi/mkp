import { Component, OnInit, Input } from "@angular/core";
import { AdminService } from "app/services/admin.service";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit {
  submitted: Boolean = false;
  productList: any;
  editProduct: any;
  editProductForm: FormGroup;
  addProductForm: FormGroup;
  view: any;
  hasCustom: any;
  hasAddon: any;
  @Input() categoryData: any;
  productDetails: any;
  constructor(private adminService: AdminService, private modalService: NgbModal, config: NgbModalConfig, private fb: FormBuilder, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.productByCatgeoryId();

    // add product form
    this.addProductForm = this.fb.group({
      productName: new FormControl(""),
      productPrice: new FormControl(""),
    });
    // edit poduct form
    this.editProductForm = this.fb.group({
      productName: new FormControl(""),
      productPrice: new FormControl(""),
    });
  }

  ngOnChanges() {
    this.productByCatgeoryId();
  }

  get f() {
    return this.addProductForm.controls;
  }

  get b() {
    return this.editProductForm.controls;
  }

  addProductFormSubmit() {
    this.submitted = true;
    if (this.addProductForm.invalid) {
      return;
    } else {
      const formData = {
        parentCategoryId: this.categoryData.categoryId,
        productName: this.addProductForm.value.productName,
        productPrice: this.addProductForm.value.productPrice,
      };

      this.adminService.addProduct(formData).subscribe((data: any) => {
        if (!data.status) {
          this.toastr.error(data.message, "failed");
        }
        this.toastr.success(data.message, "Success!");
        this.modalService.dismissAll();
        this.productByCatgeoryId();
      });
    }
  }

  productByCatgeoryId() {
    this.adminService.getProductBycategory(this.categoryData.categoryId).subscribe((data: any) => {
      if (data.status) {
        this.productList = data.items;
      }
    });
  }

  openAddProductModal(data: any) {
    this.modalService.open(data, {
      centered: true,
      scrollable: true,
      size: "lg",
    });
  }

  // open edit product modal
  openEditProductModal(data: any, edit: any) {
    this.modalService.open(data, {
      centered: true,
      scrollable: true,
      size: "lg",
    });
    this.editProduct = edit.productId;

    this.editProductForm.patchValue({
      productName: edit.productName,
      productPrice: edit.productPrice,
    });
  }

  //  edit product form submit
  editProductFormSubmit() {
    this.submitted = true;
    if (this.editProductForm.invalid) {
      return;
    } else {
      const formData = {
        productName: this.editProductForm.value.productName,
        productPrice: this.editProductForm.value.productPrice,
      };

      console.log("formData========>", formData);
      this.adminService.editProductbyId(this.editProduct, formData).subscribe((data: any) => {
        if (data.status) {
          this.toastr.success(data.message, "Success!");
          this.modalService.dismissAll();
          this.productByCatgeoryId();
        } else {
          this.toastr.error(data.message, "failed");
          this.productByCatgeoryId();
        }
      });
    }
  }

  //  open view product modal
  openViewProductModal(data: any, view: any) {
    this.modalService.open(data, {
      ariaLabelledBy: 'modal-basic-title', 
      size: 'lg', 
      windowClass: 'product-detail-modal'
    });
    this.view = view.productId;
    console.log(this.view);

    this.adminService.viewProduct(this.view).subscribe((data: any) => {
      this.productDetails = data.items;
      console.log("Product Details---------->", this.productDetails);

      this.hasCustom = this.productDetails.hasCustomization;
      this.hasAddon = this.productDetails.hasAddOn;
    });
  }

  openViewCustomizationModal(data: any) {
    this.modalService.open(data, {
      centered: true,
      scrollable: true,
      size: "lg",
    });
  }

  openViewAddonModal(data: any) {
    this.modalService.open(data, {
      centered: true,
      scrollable: true,
      size: "lg",
    });
  }
}
