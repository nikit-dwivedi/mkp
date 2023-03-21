import { AuthGuard } from './../../auth/helpers/auth.guards';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { CoreCommonModule } from "@core/common.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";

import { SampleComponent } from "./sample.component";
import { HomeComponent } from "./home.component";
import { SellerComponent } from "./seller/seller.component";
import { OutletComponent } from "./outlet/outlet.component";
import { OrderComponent } from "./order/order.component";
import { DetailComponent } from "./seller/detail/detail.component";
import { TicketComponent } from './ticket/ticket.component';
import { CommonModule } from '@angular/common';

const routes = [
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { animation: "home" },
  },
  {
    path: "seller",
    component: SellerComponent,
    canActivate: [AuthGuard],
    data: { animation: "seller" },
  },
  {
    path: "seller/detail",
    component: DetailComponent,
    canActivate: [AuthGuard],
    data: { animation: "detail" },
  },
  {
    path: "order",
    component: OrderComponent,
    canActivate: [AuthGuard],
    data: { animation: "order" },
  },
  {
    path: "ticket",
    component: TicketComponent,
    canActivate: [AuthGuard],
    data: { animation: "ticket" },
  },
];

@NgModule({
  declarations: [SampleComponent, HomeComponent, SellerComponent, OutletComponent, OrderComponent, DetailComponent, TicketComponent],
  imports: [RouterModule.forChild(routes), ContentHeaderModule, TranslateModule, NgxDatatableModule, NgbModule, CoreCommonModule,ReactiveFormsModule,CommonModule],
  exports: [SellerComponent, HomeComponent,  DetailComponent,TicketComponent,OrderComponent],
})
export class SampleModule {}
