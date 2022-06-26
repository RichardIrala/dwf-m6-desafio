import { state } from "../../state";
//Imports de los iconos de Piedra, papel o tijeras (PPoT)
const piedra = require("url:../imgs/piedra.svg");
const papel = require("url:../imgs/papel.svg");
const tijera = require("url:../imgs/tijera.svg");

customElements.define(
  "ppot-el",
  class extends HTMLElement {
    jugada;
    shadow = this.attachShadow({ mode: "open" });
    constructor() {
      super();
      this.render();
      this.addEventsInPpot();
      const style = document.createElement("style");
      style.innerHTML = `
        .imgs-container {
          position: absolute;
          bottom: 0;
          right: 50%;
          transform: translate(50%, 0);
        }
        .ppot {
          height: 126px;
          width: auto;
        }
        .ppot:hover {
          cursor: pointer;
        }
        .miau {
          animation: viaje 2s;
        }
        @keyframes viaje {
          100% {
            transform: translate(0px, -50px);
          }
        }
      `;
      this.shadow.appendChild(style);
    }

    render() {
      const div = document.createElement("div");
      div.classList.add("imgs-container");
      div.innerHTML = `
      <img class="ppot" src=${piedra}>
      <img class="ppot" src=${papel}>
      <img class="ppot" src=${tijera}>
      `;
      this.shadow.appendChild(div);
    }

    setJugada(jugada: number) {
      this.jugada = jugada;
    }

    addEventsInPpot() {
      const ppotEls = this.shadow.querySelectorAll(".ppot");

      ppotEls.forEach((e, eIndex) => {
        e.addEventListener("click", () => {
          const pathActual = location.pathname;
          const pathDelJuegoOnline = "/play-game-online";
          console.log(pathActual, "soy el path actual brother xd");
          if (pathActual == pathDelJuegoOnline) {
            //Aca va el endpoint de choice play
            console.log("FUNCIONOOOO");
            state.setMyPlayOnline(eIndex);
          }
          // //Este evento se lanza cuando elige el jugador una de las 3 opciones del juego P-P o tijera(T)
          // state.setJugada(eIndex);
          // state.computerSetJugada(Math.floor(Math.random() * 3));
        });
      });
    }
  }
);
