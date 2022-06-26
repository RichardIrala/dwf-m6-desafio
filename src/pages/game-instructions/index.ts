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
      const div = document.createElement("div");
      div.classList.add("principal-container");
      const style = document.createElement("style");
      div.innerHTML = `
        <header-in-game-el></header-in-game-el>
        <p class="instructions">Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.</p>
        <game-button-blue>¡Jugar!</game-button-blue>
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
          gap: 74px;
          padding-top: 115px;
        }
        .instructions {
            width: 317px;
            font-size: 40px;
            font-weight: 600;
            text-align: center;
        }
      `;

      this.shadow.appendChild(div);
      this.shadow.appendChild(style);
    }
    addListeners() {
      this.shadow
        .querySelector("game-button-blue")
        .addEventListener("click", () => {
          state.setReadyToPlay();
          //AGREGAR el state que consume el fetch que actualiza el estado de jugar a "TRUE", para que luego el juego lo tome y comiencen los chicos a jugar
        });
    }
  }
);
