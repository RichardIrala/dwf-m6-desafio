import { Router } from "@vaadin/router";
import Swal from "sweetalert2";
import { state } from "../../state";

const fondoDelJuego = require("url:../../components/imgs/fondo.svg");

//Instrucciones del Ppot
customElements.define(
  "game-instructions-el",
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

      const style = document.createElement("style");
      this.shadow.innerHTML = `
      <homepage-icon></homepage-icon>
      <div class="principal-container">
        <header-in-game-el></header-in-game-el>
        <div class="instructions-container">
          <p class="instructions">Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.</p>
          <game-button-blue>¡Jugar!</game-button-blue>
        </div>
        <ppot-el></ppot-el>
      </div>  
      `;
      style.innerHTML = `
        * {
          margin: 0;
          box-sizing: border-box;
        }
        .principal-container {
          background: url(${fondoDelJuego});
          background-size: cover;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding-top: 115px;
        }
        .instructions-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
        }
        .instructions {
            width: 317px;
            font-size: 40px;
            font-weight: 600;
            text-align: center;
        }
      `;

      this.shadow.appendChild(style);
    }
    addListeners() {
      this.shadow
        .querySelector("game-button-blue")
        .addEventListener("click", () => {
          state.setReadyToPlay();
        });
    }
  }
);
