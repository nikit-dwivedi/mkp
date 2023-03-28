import { Component, OnInit } from '@angular/core';
import { Router, Navigation } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  outletDetails: any;

  constructor(private router: Router,) { 
    let nav: Navigation = this.router.getCurrentNavigation();
    if (nav.extras && nav.extras.state && nav.extras.state.outletDetails) {
      this.outletDetails = nav.extras.state.sellerDetail;
    } else {
      this.router.navigate(["allOutlet"]);
    }
  }

  ngOnInit(): void {
  }

}
