import { Component, OnInit } from "@angular/core";
import { Router, Navigation } from "@angular/router";
import { AdminService } from "app/services/admin.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
  outletDetails: any;
  categoryList: any;
  categoryId: any;
  subCategoryById: any;
  categoryData: any;
  subCategoryList: any;
  subcat: any;
  myData: any;

  constructor(private router: Router, private adminService: AdminService) {
    let nav: Navigation = this.router.getCurrentNavigation();
    if (nav.extras && nav.extras.state && nav.extras.state.outletDetails) {
      this.outletDetails = nav.extras.state.outletDetails;
    } else {
      this.router.navigate(["allOutlet"]);
    }
  }

  ngOnInit(): void {
    this.myData = this.outletDetails;
  }
}
