import { Component, Input, OnInit } from '@angular/core';
import { Navigation, Router } from '@angular/router';
import { AdminService } from 'app/services/admin.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  hasSubCheck: Boolean = false;
  categoryList: any;
  tempCategory:any



  @Input() outletData: any; categoryData: any
  constructor(private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {

    console.log("Menu Component Data==========>", this.outletData,this.categoryData);
    this.outletData ? this.categoryByOutlet() : this.categoryByCatgeoryId();
    this.categoryByOutlet();

  }

  categoryByOutlet() {
    this.adminService.getCategory(this.outletData.outletId).subscribe((data: any) => {
      this.categoryList = data.items;
      console.log("Category List====>", this.categoryList);

    });
  }
  subCategory(data: any) {
    this.tempCategory=data
    console.log("categoryData Data==========>", this.categoryData);
    this.hasSubCheck = data.hasSubCategory
    console.log(data);
  }

  categoryByCatgeoryId() {
    this.adminService.getSubcategory(this.categoryData.categoryId).subscribe((data: any) => {
      this.categoryList = data.items;
      console.log("Category List====>", this.categoryList);

    });
  }
}
