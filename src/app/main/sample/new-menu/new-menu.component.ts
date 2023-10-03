import { Component, OnInit } from "@angular/core";
import { SwiperConfigInterface } from "ngx-swiper-wrapper";

@Component({
  selector: "app-new-menu",
  templateUrl: "./new-menu.component.html",
  styleUrls: ["./new-menu.component.scss"],
})
export class NewMenuComponent implements OnInit {
  public centeredSlide2Index = 2;

  constructor() {}

  ngOnInit(): void {}

  // swiper
  public swiperNavigations: SwiperConfigInterface = {
    navigation: true,
  };
  public swiperCenteredSlides2: SwiperConfigInterface = {
    slidesPerView: 5,
    centeredSlides: true,
    spaceBetween: 30,
    slideToClickedSlide: true,
  };
}
