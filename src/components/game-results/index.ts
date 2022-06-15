import { gamePage } from "../../pages/play-game";
import { state } from "../../state";
//SOLO SE PUEDE USAR 1 vez por página
customElements.define(
  "game-results",
  class extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    constructor() {
      super();
      this.render();
      const style = document.createElement("style");
      //USAR CONSTANTES PARA LOS COLORES
      style.innerHTML = `
        .game-results__result-container {
          text-align: center;
          position: absolute;
          left: 50%; top: 5%;
          transform: translate(-50%);
        }
        .game-results__result {
          font-size: 8vh;
          color: white;
        }
        @media (max-width: 500px) {
          .game-results__result {
            font-size: 5vh;
          }

        }
        
        .game-results__status {
          width: 50vw; height: 40vh; background: rgba(0, 144, 72, 1);
          position: absolute;
          left: 50%; top: 30%;
          transform: translate(-50%);
          margin: auto;
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
        .game-results__status-text {
          color: white;
          font-size: 5vh;
        }
        @media(max-width: 500px) {
          .game-results__status-text {
          
            font-size: 3vh;
          }
        }
        .all-content-container {
          width: 100vw; height: 100vh;
          background: linear-gradient(90deg, rgba(6,214,124,1) 0%, rgba(9,67,236,1) 100%);
          
        }
        .game-results__volver-a-jugar {
          position: absolute;
          left: 50%; bottom: 5%;
          transform: translate(-50%);
        }
      `;
      this.shadow.appendChild(style);
      this.eventosAgregados();
    }
    render() {
      const cs = state.getState();
      const victorias = cs.game.gamesStatus.victorys;
      const derrotas = cs.game.gamesStatus.losses;
      const div = document.createElement("div");
      div.classList.add("all-content-container");
      div.innerHTML = `
      <div class="game-results__result-container">
        <span class="game-results__result">${this.textContent}</span>
      </div>
      <div class="game-results__status">
        <span class="game-results__status-text">Score:</span>
        <span class="game-results__status-text">Victorias: ${victorias}</span>
        <span class="game-results__status-text">Derrotas: ${derrotas}</span>
      </div>
      <div class="game-results__volver-a-jugar">
        <game-button-blue class="button-volver-a-jugar">Volver a Jugar</game-button-blue>
      </div>
      <homepage-icon></homepage-icon>
      `;
      this.shadow.appendChild(div);
    }
    eventosAgregados() {
      this.shadow
        .querySelector(".game-results__volver-a-jugar")
        .addEventListener("click", () => {
          const BASE_PATH = "/desafio-m5";
          function isGithubPages() {
            return location.host.includes("github.io");
          }
          //Esto es un router manual solo para este componente que simula ser una página pero no lo es
          const completePath = isGithubPages()
            ? BASE_PATH + "/play-game"
            : "/play-game";
          history.pushState({}, "", completePath);
          gamePage();
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
