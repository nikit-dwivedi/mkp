import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AdminService } from "app/services/admin.service";

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

  constructor(private _route: ActivatedRoute, private _router: Router, private adminService: AdminService) {}

  ngOnInit(): void {
    if (!this._route.snapshot.queryParams["oId"]) {
      this._router.navigate(["allOutlet"]);
    }
    this.outletId = this._route.snapshot.queryParams["oId"];
    this.getFullMenu();
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
}
