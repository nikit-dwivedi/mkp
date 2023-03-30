import { Component, OnInit } from '@angular/core';
import { Router, Navigation } from '@angular/router';
import { AdminService } from 'app/services/admin.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  outletDetails: any;
  categoryList:any
  categoryId: any;
  subCategoryById: any;
  categoryData: any;
  subCategoryList:any;
  subcat:any;
  constructor(private router: Router,private adminService: AdminService) { 
    let nav: Navigation = this.router.getCurrentNavigation();
    if (nav.extras && nav.extras.state && nav.extras.state.outletDetails) {
      this.outletDetails = nav.extras.state.outletDetails.outletId;
      
      
    } else {
      this.router.navigate(["allOutlet"]);
    }
  }

  ngOnInit(): void {
    this.categoryByOutlet();
  }

  categoryByOutlet(){
    this.adminService.getCategory(this.outletDetails).subscribe((data:any) => {
      this.categoryList = data.items;

    })  
  }
  

  subCategory(data:any){


    this.categoryData = data.categoryId;
    this.subcat = data.hasSubCategory;
    console.log(this.categoryData);
    
    this.adminService.getSubcategory(this.categoryData).subscribe((data:any) => {
      this.subCategoryList = data.items
    })
  }


}
