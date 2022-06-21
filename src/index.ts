import "./router";
import "./components/game-title/index.ts";
import "./components/game-button-blue/index.ts";
import "./components/PPoT/index.ts";
import "./components/game-results/index.ts";
import "./components/homepage-icon/index.ts";
import "./rtdb";

import { state } from "./state";
(function () {
  // const root = document.querySelector(".root");
  state.init();
  sessionStorage.setItem("mod6-desafio", JSON.stringify(state.getState()));
  state.subscribe(() => {
    sessionStorage.setItem("mod6-desafio", JSON.stringify(state.getState()));
  });
  console.log("Holis");
  //Esto me sirve para dsp hacer la version (join Room)
  // state.setRoomRef("10302f94-f538-4e8f-935f-2fffcb9edc9f").then(() => {
  //   state.listenDatabase();
  // });
})();
