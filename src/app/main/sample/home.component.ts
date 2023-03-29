import PubNub from "pubnub";
import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../services/admin.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(private adminService: AdminService) {
    this.pubnub.subscribe({
      channels: ["order-admin"],
    });
    this.pubnub.addListener({
      message: (m) => {
        this.getStatOfMP();
      },
    });
  }

  public contentHeader: object;
  public orderStatArray: any;
  public outletStatArray: any;
  public pubnub = new PubNub({
    publishKey: "pub-c-40e1c3cd-397d-449b-9a06-2e0505653027",
    subscribeKey: "sub-c-e240b078-b657-4d79-84e1-0504adfe3cf8",
    userId: "clientId",
  });
  getStatOfMP() {
    this.adminService.getStat().subscribe((response) => {
      if (response.status) {
        this.orderStatArray = response.items.order;
        this.outletStatArray = response.items.outlet;
      }
    });
  }

  getStatusColor(status: any) {
    switch (status) {
      case "pending":
        return "bg-light-warning";
      case "preparing":
        return "bg-light-info";
      case "ready":
        return "bg-light-secondary";
      case "dispatched":
        return "bg-light-dark";
      case "delivered":
      case "open":
      case "visible":
        return "bg-light-success";
      case "cancelled":
      case "closed":
      case "not visible":
        return "bg-light-danger";
    }
  }

  getStatusIcon(status: any) {
    switch (status) {
      case "pending":
        return "alert-circle";
      case "preparing":
        return "clock";
      case "ready":
        return "shopping-bag";
      case "dispatched":
        return "map-pin";
      case "delivered":
      case "open":
        return "check-circle";
      case "visible":
        return "check-square";
      case "cancelled":
      case "closed":
        return "x-circle";
      case "not visible":
        return "alert-triangle";
    }
  }
  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    this.getStatOfMP();

    this.contentHeader = {
      headerTitle: "Home",
      actionButton: true,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "Home",
            isLink: true,
            link: "/",
          },
          {
            name: "Sample",
            isLink: false,
          },
        ],
      },
    };
  }
}
