import { Router } from "@vaadin/router";
import Swal from "sweetalert2";
import { state } from "../../state";

const fondoDelJuego = require("url:../../components/imgs/fondo.svg");

//Instrucciones del Ppot
customElements.define(
  "waiting-players-el",
  class extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    constructor() {
      super();
      this.render();
      this.addListeners();
    }
    render() {
      document.querySelector(".root").innerHTML = ``;
      this.shadow.innerHTML = ``;
      const div = document.createElement("div");
      div.classList.add("principal-container");
      const style = document.createElement("style");

      div.innerHTML = `
        <div>
          <p class="instructions">Compartí el código:</p>
          <p class="instructions instructions--roomId">${state.getShortRoomId()}</p>
          <p class="instructions">Con tu contrincante</p>
        </div>
        <ppot-el></ppot-el>
        <homepage-icon></homepage-icon>
      `;
      style.innerHTML = `
        * {
          margin: 0;
          box-sizing: border-box;
        }
        .principal-container {
          background: url(${fondoDelJuego});
          background-size: cover;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 74px;
          padding-top: 115px;
        }
        .instructions {
            max-width: 350px;
            font-size: 40px;
            font-weight: 400;
            text-align: center;
        }
        .instructions.instructions--roomId {
          font-weight: 600
        }
      `;

      this.shadow.appendChild(div);
      this.shadow.appendChild(style);
    }
    addListeners() {}
  }
);
