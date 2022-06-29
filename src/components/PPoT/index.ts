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
      const alturaDelPPOT = "126px";
      style.innerHTML = `
        .imgs-container {
          height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        .imgs-content {
          
        }
        .ppot {
          height: ${alturaDelPPOT};
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
        .display-none {
          display: none;
        }
      `;
      this.shadow.appendChild(style);
    }

    render() {
      const div = document.createElement("div");
      div.classList.add("imgs-container");
      div.innerHTML = `
      <div class="imgs-content">
        <img class="ppot ppot-event" src=${piedra}>
        <img class="ppot ppot-event" src=${papel}>
        <img class="ppot ppot-event" src=${tijera}>
      </div>
      `;
      this.shadow.appendChild(div);
    }

    setJugada(jugada: number) {
      this.jugada = jugada;
    }

    addEventsInPpot() {
      const ppotEls = this.shadow.querySelectorAll(".ppot-event");

      ppotEls.forEach((e, eIndex) => {
        e.addEventListener("click", () => {
          const pathActual = location.pathname;
          const pathDelJuegoOnline = "/play-game-online";
          console.log(pathActual, "soy el path actual");
          if (pathActual == pathDelJuegoOnline) {
            //Aca va el endpoint de choice play
            console.log("Soy eleccion de jugada");
            efectoDeElegirJugada(eIndex);
            state.setMyPlayOnline(eIndex);
          }
        });
      });

      function efectoDeElegirJugada(indexElClicked) {
        ppotEls.forEach((e, eIndex, allElements) => {
          if (allElements[indexElClicked] != e) {
            e.classList.add("display-none");
          }
        });
      }
    }
  }
);
