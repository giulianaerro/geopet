import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/", component: "hom-ge" },
  { path: "/auth", component: "auth-comp" },
  { path: "/signin", component: "signin-comp" },
  { path: "/signup", component: "signup-comp" },
  { path: "/reportpet", component: "petlost-comp" },
  { path: "/mylostpets", component: "mypets-comp" },
]);
