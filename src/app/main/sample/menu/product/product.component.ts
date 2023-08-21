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
  switcher: boolean;
  isVeg: false;
  @Input() categoryData: any;
  productDetails: any;
  product: any;
  imageData: any;
  producyById: any;
  newImage: any;
  previousImage: any;
  checkveg: any;
  constructor(private adminService: AdminService, private modalService: NgbModal, config: NgbModalConfig, private fb: FormBuilder, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.productByCatgeoryId();

    // add product form
    this.addProductForm = this.fb.group({
      productName: new FormControl(""),
      productPrice: new FormControl(""),
      productDesc: new FormControl(""),
      productImage: new FormControl(""),
      isVeg: new FormControl(""),
    });
    // edit poduct form
    this.editProductForm = this.fb.group({
      productName: new FormControl(""),
      productPrice: new FormControl(""),
      productDesc: new FormControl(""),
      productImage: new FormControl(""),
      isVeg: new FormControl(""),
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

  getImage(event: any) {
    this.imageData = event.target.files[0];
  }

  // open add product Modal
  openAddProductModal(data: any) {
    this.modalService.open(data, {
      centered: true,
      scrollable: true,
      size: "lg",
    });
  }

  addProductFormSubmit() {
    this.submitted = true;
    if (this.addProductForm.invalid) {
      return;
    } else {
      const formData = new FormData();
      formData.append("parentCategoryId", this.categoryData.categoryId);
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
        }
        this.toastr.success(data.message, "Success!");
        this.modalService.dismissAll();
        this.productByCatgeoryId();
        this.addProductForm.reset();
        this.imageData = null;
      });
    }
  }

  productByCatgeoryId() {
    this.adminService.getProductBycategory(this.categoryData?.categoryId).subscribe((data: any) => {
      if (data.status) {
        this.productList = data.items;
      }
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
    this.previousImage = edit.productImage;
    this.editProductForm.patchValue({
      productName: edit.productName,
      productPrice: edit.productPrice,
      productDesc: edit.productDesc,
      isVeg:edit.isVeg
    });
  }

  changeImage(event: any) {
    this.newImage = event.target.files[0];
  }
  //  edit product form submit
  editProductFormSubmit() {
    this.submitted = true;
    if (this.editProductForm.invalid) {

      return;
    } else {
      this.checkveg = JSON.parse(this.editProductForm.value.isVeg);
      const formData = new FormData();
      formData.append("productName", this.editProductForm.value.productName);
      formData.append("productPrice", this.editProductForm.value.productPrice);
      formData.append("productDesc", this.editProductForm.value.productDesc);
      formData.append("isVeg", this.checkveg);
      if (this.newImage == undefined) {
        formData.append("productImage", this.previousImage);
      } else {
        formData.append("productImage", this.newImage);
      }

      this.adminService.editProductbyId(this.editProduct, formData).subscribe((data: any) => {
        if (data.status) {
          this.toastr.success(data.message, "Success!");
          this.modalService.dismissAll();
          this.productByCatgeoryId();
          this.editProductForm.reset();
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
      ariaLabelledBy: "modal-basic-title",
      size: "lg",
      windowClass: "product-detail-modal",
    });
    this.view = view.productId;

    this.adminService.viewProduct(this.view).subscribe((data: any) => {
      this.productDetails = data.items;

      this.hasCustom = this.productDetails.hasCustomization;
      this.hasAddon = this.productDetails.hasAddOn;
      this.switcher = this.productDetails.inStock;
    });
  }

  openDeleteProductModal(data: any, product: any) {
    this.modalService.open(data, {
      centered: true,
      scrollable: true,
      size: "lg",
    });
    this.producyById = product.productId;
  }
  deleteProduct() {
    const body = {
      productId: this.producyById,
    };
    this.adminService.deleteData(body).subscribe((data: any) => {
      if (data.status) {
        this.toastr.success(data.message, "Success!");
        this.productByCatgeoryId();
        this.modalService.dismissAll();
      } else {
        this.toastr.error(data.message, "error!");
      }
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
