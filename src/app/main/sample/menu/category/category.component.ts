import { Component, Input, OnInit } from "@angular/core";
import { Navigation, Router } from "@angular/router";
import { AdminService } from "app/services/admin.service";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
})
export class CategoryComponent implements OnInit {
  hasSubCheck: Boolean = false;
  hasProdCheck: Boolean = false;
  categoryList: any;
  tempCategory: any;

  @Input() outletData: any;
  @Input() categoryData: any;
  constructor(private router: Router, private adminService: AdminService) {}

  ngOnInit(): void {
    this.outletData ? this.categoryByOutlet() : this.categoryByCatgeoryId();
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
    
  }

  categoryByCatgeoryId() {
    this.adminService.getSubcategory(this.categoryData.categoryId).subscribe((data: any) => {
      // console.log("================",data);
      this.categoryList = data.items;
    });
  }
}
