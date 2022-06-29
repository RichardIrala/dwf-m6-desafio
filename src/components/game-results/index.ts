import { Router } from "@vaadin/router";
import { state } from "../../state";
//SOLO SE PUEDE USAR 1 vez por página
customElements.define(
  "game-results",
  class extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    constructor() {
      super();
      this.render();
      state.setRenderResultsOnChange(() => {
        this.render();
      });
      state.setStartFalse();
    }
    render() {
      this.shadow.innerHTML = ``;
      const cs = state.getState();
      const myName = cs.me.userName;
      const enemyName = cs.enemyName;
      const victorias = cs.scores.me;
      const derrotas = cs.scores.enemy;
      const div = document.createElement("div");
      div.classList.add("all-content-container");
      div.innerHTML = `
      <div class="game-results__result-container">
        <span class="game-results__result">${this.textContent}</span>
      </div>
      <div class="game-results__status">
        <span class="game-results__status-text">Score:</span>
        <span class="game-results__status-text">${myName}: ${
        victorias || 0
      }</span>
        <span class="game-results__status-text">${enemyName}: ${
        derrotas || 0
      }</span>
      </div>
      <div class="game-results__volver-a-jugar">
        <game-button-blue class="button-volver-a-jugar">Volver a Jugar</game-button-blue>
      </div>
      <homepage-icon></homepage-icon>
      `;
      this.shadow.appendChild(div);
      //
      const style = document.createElement("style");
      //USAR CONSTANTES PARA LOS COLORES
      style.innerHTML = /*css*/ `
        * {
          box-sizing: border-box;
          margin: 0;
        }

        .all-content-container {
          width: 100vw; height: 100vh;
          background: linear-gradient(90deg, rgba(6,214,124,1) 0%, rgba(9,67,236,1) 100%);
          padding: 40px 0;
          display: flex;
          gap: 20px;
          flex-direction: column;
          justify-content: center; align-items: center;
        }

        .game-results__result-container {
          text-align: center;
        }
        .game-results__result {
          font-size: 70px;
          color: white;
        }
        @media (max-width: 500px) {
          .game-results__result {
            font-size: 45px;
          }

        }
        
        .game-results__status {
          background: rgba(0, 144, 72, 1);
          display: flex; flex-direction: column;
          justify-content: center; align-items: center; gap: 2vh;
          border-radius: 4px; border: solid #00ff00 1vh;
          animation: bordesAnimacioooon linear 3s infinite;
        }
        @keyframes bordesAnimacioooon {
          0% {
            border-color: #000000;
          }
          25% {
            border-color: #ffffff
          }
          50% {
            border-color: #000000;
          }
          75% {
            border-color: #ffffff
          }
          100% {
            border-color: #000000;
          }
        }
        .game-results__status {
          width: 300px;
          padding: 20px;
        }
        @media(min-width: 500px) {
          .game-results__status {
            width: 400px;
          }
        }
        @media(min-width: 768px) {
          .game-results__status {
            width: 600px;
            padding: 40px 0;
          }
        }
        @media(min-width: 1200px) {
          .game-results__status {
            width: 800px;
            padding: 60px 0;
          }
        }
        
        .game-results__status-text {
          color: white;
          font-size: 45px;
        }
        @media(max-width: 500px) {
          .game-results__status-text {
          
            font-size: 32px;
          }
        }
        
        .game-results__volver-a-jugar {
          
        }
      `;
      this.shadow.appendChild(style);
      this.eventosAgregados();
    }
    eventosAgregados() {
      this.shadow
        .querySelector(".game-results__volver-a-jugar")
        .addEventListener("click", () => {
          Router.go("/game-instructions");
        });
      //ESTO COMENTADO ES UNA MANERA DE EDITAR EL SHADOW DE OTRO COMPONENTE
      // const resultadoDeljuego = this.shadow.querySelector("game-button-blue");
      // const shadowDelResultado = resultadoDeljuego["shadow"];
      // const estilosNuevos = document.createElement("style");
      // estilosNuevos.innerHTML = `
      //   button {
      //     background: red;
      //   }
      // `;
      // shadowDelResultado.appendChild(estilosNuevos);
    }
  }
);
