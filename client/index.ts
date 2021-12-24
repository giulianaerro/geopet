import "./components/header";
import "./components/button";
import "./components/card";
import "./components/text";

import "./pages/home";
import "./pages/signIn";
import "./pages/auth";
import "./pages/publish-lost-pet";
import "./pages/my-lost-pets";

import "./pages/signup";
import "./routes";
import { state } from "./state";

(function () {
  state.init();
})();
