import { Component, OnInit, Input } from "@angular/core";
import { AdminService } from "app/services/admin.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit {
  productList: any;

  @Input() categoryData: any;
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.productByCatgeoryId();
  }
  productByCatgeoryId() {
    this.adminService.getProductBycategory(this.categoryData.categoryId).subscribe((data: any) => {
      console.log("================",data);
      // if (data.status) {
      //   this.productList = data.items;
      //   console.log(this.productList);
        
      // }
      this.productList = data.items;
    });
  }
}
