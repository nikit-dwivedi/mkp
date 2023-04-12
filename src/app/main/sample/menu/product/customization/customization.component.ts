import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AdminService } from "app/services/admin.service";
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from "@swimlane/ngx-datatable";
import { FormGroup, FormBuilder, FormControl, } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-customization',
  templateUrl: './customization.component.html',
  styleUrls: ['./customization.component.scss']
})
export class CustomizationComponent implements OnInit {
  public contentHeader: object;
  public rows: any;
  public rows1: any;
  public sellerOutlet: any;
  public sellerDetail: any;
  private tempData = [];
  private tempData1 = [];
  public ColumnMode = ColumnMode;
  

  public basicSelectedOption: number = 5;
  public basicSelectedOption1: number = 5;
  public kitchenSinkRows = [];
  public kitchenSinkRows1 = [];

  @Input() productData: any;
  @ViewChild(CustomizationComponent) table: CustomizationComponent | any;
  @ViewChild("tableRowDetails") tableRowDetails: any;
  submitted: Boolean = false;
  editVariationForm: FormGroup;
  addVariationForm:FormGroup;
  addVariantForm:FormGroup;
  editVariantForm:FormGroup;
  customizationList: any;
  customizeById: any;
  variationList: any[];
  variantData: any;
  editVariant:any;
constructor(private adminService: AdminService, private modalService: NgbModal, config: NgbModalConfig, private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {

    console.log("Product Data=======>", this.productData);
    this.getVariation();

    // add variation form
    this.addVariationForm = this.fb.group({
      variationName: new FormControl('')
    });

    // edit variation form
    this.editVariationForm = this.fb.group({
      variationName: new FormControl(''),
      minSelection: new FormControl(''),
      maxSelection: new FormControl('')
    });

    // add variant form
    this.addVariantForm = this.fb.group({
      variantName: new FormControl(''),
      variantPrice: new FormControl('')
    })

    // edit variant form
    this.editVariantForm = this.fb.group({
      variantName: new FormControl(''),
      variantPrice:new FormControl('')
    })
  }

  get addVariation() {
    return this.addVariationForm.controls;
  }

  get editVariation() {
    return this.editVariationForm.controls;
  }

  get addVariant() {
    return this.addVariantForm.controls
  }

  get editVariantById() {
    return this.editVariantForm.controls
  }


  openAddCustomizationModal(data:any){
    this.modalService.open(data,{
      centered:true,
      scrollable:true,
      size:'lg'
    })

  }

  addCustomizationFormSubmit(){
    this.submitted = true;
    if(this.addVariationForm.invalid){
      return;
    }
    else{

      const formData = {
        productId:this.productData.productId,
        variationName:this.addVariationForm.value.variationName
      }
     this.adminService.addCustomization(formData).subscribe((data:any) => {
      console.log("formData",formData);
      
      if(data.status){
        this.toastr.success(data.message,"Success");
        this.getVariation();
      }
      else{
        this.toastr.error(data.message,"failed");
        this.getVariation();
      }
     })
    }
  }
  
  // get Variation list
  getVariation() {
    this.adminService.getProductCustomization(this.productData.productId).subscribe((data: any) => {
      this.customizationList = data.items;
      this.variationList = []

      this.variationList.push(this.customizationList);
      this.rows = this.variationList;
      this.kitchenSinkRows = this.rows;
      this.tempData = this.rows;

      console.log("Customization LIst", this.variationList);

    });
  }

  // open add variant Modal
  openAddVariantModal(data:any){
    this.modalService.open(data,{
      centered:true,
      scrollable:true,
      size:'lg'
     });
  }

  addVariantFormSubmit(){
    this.submitted = true;
    if(this.addVariantForm.invalid){
      return;
    }
    else{
      const formData = {
        variationId:this.customizationList.variationId,
        variantName:this.addVariantForm.value.variantName,
        variantPrice:this.addVariantForm.value.variantPrice
      }

     
      
      this.adminService.addVariation(formData).subscribe((data:any) => {
        if(data.status){
          this.toastr.success(data.message,"Suceess!");
          this.getVariation();
        }
        else{
          this.toastr.error(data.message,"failed");
          this.getVariation();
        }
        
      })
    }
  }

  // open view variant Modal
  openViewVariantModal(data: any, view: any) {
    this.modalService.open(data, {
      centered: true,
      scrollable: true,
      size: 'xl'
    });
    console.log("view", view);

    this.variantData = view.variantList

   
    this.getVariant();
  }
  getVariant() {
   
    this.rows1 = this.variantData;
    this.kitchenSinkRows1 = this.rows1;
    this.tempData1 = this.rows1;
    console.log(this.tempData1);
  }

  // open open edit variant Modal
  openEditVariantModal(data:any,edit:any){
    this.modalService.open(data,{
      centered:true,
      scrollable:true,
      size:'lg'
    });
    this.editVariant = edit

    console.log(this.editVariant);
    
    this.editVariantForm.patchValue({
      variantName:edit.variantName,
      variantPrice:edit.displayPrice
    });
  }

  editVariantFormSubmit(){
    this.submitted = true;
    if(this.editVariantForm.invalid){
      return;
    }
    else{
      const formData = {
        variantId:this.editVariant.variantId,
        variantName:this.editVariantForm.value.variantName,
        variantPrice:this.editVariantForm.value.variantPrice
      }

      this.adminService.editVariant(formData).subscribe((data:any) => {
       
        
        if(data.status){
          this.toastr.success(data.message,"Success");
          this.getVariation();
        }
        else{
          this.toastr.error(data.message,"failed");
          this.getVariation();
          
        }
      })
    }
  }

  //  open EditCustomization Modal
  openEditCustomizationModal(data: any, edit: any) {
    this.modalService.open(data, {
      centered: true,
      scrollable: true,
      size: 'lg'
    });
    this.customizeById = edit;

    console.log("edit", edit);

    this.editVariationForm.patchValue({
      variationName: edit.variationName,
      minSelection: edit.minSelection,
      maxSelection: edit.maxSelection
    })
  }

  editVariationFormSubmit() {
    this.submitted = true;
    if (this.editVariationForm.invalid) {
      return;
    }
    else {
      const formData = {
        variationName: this.editVariationForm.value.variationName,
        minSelection: this.editVariationForm.value.minSelection,
        maxSelection: this.editVariationForm.value.maxSelection
      }


      this.adminService.editVariation(this.customizationList.variationId, formData).subscribe((data: any) => {
        console.log("formData", formData);
        if (data.status) {
          this.toastr.success(data.message, "Success!");
          this.getVariation();
        }
        else {
          this.toastr.error(data.message, "failed");
          this.getVariation();
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
