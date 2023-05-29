import { CoreMenu } from "@core/types";

export const menu: CoreMenu[] = [
  {
    id: "home",
    title: "Home",
    translate: "MENU.HOME",
    type: "item",
    icon: "home",
    url: "home",
  },
  {
    id: "seller",
    title: "Seller",
    translate: "MENU.SELLER",
    type: "item",
    icon: "users",
    url: "seller",
  },
  {
    id: "all outlet",
    title: "Outlet",
    translate: "MENU.ALLOUTLET",
    type: "item",
    icon: "users",
    url: "allOutlet",
  },
  {
    id: "order",
    title: "Order",
    translate: "MENU.ORDER",
    type: "item",
    icon: "package",
    url: "order",
  },
  {
    id: "ticket",
    title: "Ticket",
    translate: "MENU.ORDER",
    type: "item",
    icon: "package",
    url: "ticket",
  },
  {
    id: "payment",
    title: "Payment",
    translate: "MENU.PAYMENT",
    type: "item",
    icon: "dollar-sign",
    url: "payment",
  },
];
