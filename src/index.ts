import "./router";
import "./components/game-title/index.ts";
import "./components/game-button-blue/index.ts";
import "./components/PPoT/index.ts";
import "./components/game-results/index.ts";
import "./components/homepage-icon/index.ts";
import "./rtdb";

import { state } from "./state";
(function () {
  const root = document.querySelector(".root");
  state.init();
  localStorage.setItem("mod6-desafio", JSON.stringify(state.getState()));
  state.subscribe(() => {
    localStorage.setItem("mod6-desafio", JSON.stringify(state.getState()));
  });

  window.onpopstate = function () {};
})();
