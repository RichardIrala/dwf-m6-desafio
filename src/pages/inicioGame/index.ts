import { Router } from "@vaadin/router";

const fondoDelJuego = require("url:../../components/imgs/fondo.svg");

//Inicio el juego de piedra papel o tijeras
customElements.define(
  "inicio-game-el",
  class extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    constructor() {
      super();
      this.render();
      this.addListeners();
    }
    render() {
      this.shadow.innerHTML = ``;
      const div = document.createElement("div");
      const style = document.createElement("style");
      div.classList.add("principal-container");

      div.innerHTML = ` 
        <game-title></game-title>
        <game-button-blue class="ir-a">Empezar</game-button-blue>
        <ppot-el></ppot-el>
        <homepage-icon></homepage-icon>
      `;
      style.innerHTML = `
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
      `;
      this.shadow.appendChild(div);
      this.shadow.appendChild(style);
    }
    addListeners() {
      this.shadow.querySelector(".ir-a").addEventListener("click", () => {
        Router.go("/game-instructions");
      });
    }
  }
);
