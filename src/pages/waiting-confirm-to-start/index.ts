import { state } from "../../state";

const fondoDelJuego = require("url:../../components/imgs/fondo.svg");

//Instrucciones del Ppot
customElements.define(
  "waiting-confirm-to-start-el",
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
      const playerNames = state.getPlayerNames();
      this.shadow.innerHTML = `
      <homepage-icon></homepage-icon>
      <div class="principal-container">
        <header-in-game-el></header-in-game-el>
        <div>
          <p class="instructions">
            Esperando a que
            <br>
                <span class="instructions instructions--roomId">${playerNames.enemyName} </span>presione
            <br>
            !Jugar!...
          </p>
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

      this.shadow.appendChild(style);
    }
    addListeners() {}
  }
);
