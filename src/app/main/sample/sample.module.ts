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

const routes = [
  {
    path: "sample",
    component: SampleComponent,
    data: { animation: "sample" },
  },
  {
    path: "home",
    component: HomeComponent,
    data: { animation: "home" },
  },
  {
    path: "seller",
    component: SellerComponent,
    data: { animation: "seller" },
  },
  {
    path: "order",
    component: OrderComponent,
    data: { animation: "order" },
  },
];

@NgModule({
  declarations: [SampleComponent, HomeComponent, SellerComponent, OutletComponent, OrderComponent],
  imports: [RouterModule.forChild(routes), ContentHeaderModule, TranslateModule, NgxDatatableModule, NgbModule, CoreCommonModule],
  exports: [SampleComponent, HomeComponent, OrderComponent, SampleComponent],
})
export class SampleModule {}
