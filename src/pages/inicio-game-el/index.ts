import { Router } from "@vaadin/router";
import { state } from "../../state";

const fondoDelJuego = require("url:../../components/imgs/fondo.svg");
customElements.define(
  "inicio-game-element",
  class extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    constructor() {
      super();
      this.render();
      this.addListeners();
    }
    render() {
      this.shadow.innerHTML = ``;
      // const div = document.createElement("div");
      const style = document.createElement("style");
      // div.classList.add("principal-container");
      this.shadow.innerHTML = `
      <homepage-icon></homepage-icon>
      <div class="principal-container">
        <div class="title-and-buttons">
          <game-title></game-title>
          <game-button-blue class="ir-a new-game">Nuevo Juego</game-button-blue>
          <game-button-blue class="ir-a join-game">Ingresar a una sala</game-button-blue>
        </div>
        <div>
          <ppot-el></ppot-el>
        </div> 
      </div>
      `;
      // div.innerHTML = ``;
      style.innerHTML = `
        * {
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
        .title-and-buttons {
          display: flex;
          flex-direction: column;
          gap: 40px;
          align-items: center;
        }
      `;
      // this.shadow.appendChild(div);
      this.shadow.appendChild(style);
    }
    addListeners() {
      this.shadow.querySelector(".new-game").addEventListener("click", () => {
        console.log("nuevo juego");
        state.newRoom();
      });
      this.shadow.querySelector(".join-game").addEventListener("click", () => {
        Router.go("/ingresar-a-una-sala");
      });
    }
  }
);
