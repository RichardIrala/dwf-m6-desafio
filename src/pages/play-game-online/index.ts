import { state } from "../../state";

const fondoDelJuego = require("url:../../components/imgs/fondo.svg");

//Juego de piedra papel o tijeras
customElements.define(
  "play-game-online-el",
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
      div.classList.add("principal-container");
      const style = document.createElement("style");
      div.innerHTML = `
        <ppot-el></ppot-el>
      `;
      style.innerHTML = `
        * {
          margin: 0;
          box-sizing: border-box;
        }
        .play-game__contador-container {
          display: flex; justify-content: center; align-items: center;
          width: 243px; height: 243px;
          font-size: 64px;
          position: absolute; top: 50%; transform: translate(0 , -50%);
          border-radius: 50%;
          background: green;
          animation: specialAnimation 4s linear;
          border: solid;
        }
        
        @keyframes specialAnimation {
          25% {}
          50% {
            background: green;
          }
          75% {
            background: yellow;
          }
          100% {
            background: red;
          }
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
      `;

      this.shadow.appendChild(div);
      this.shadow.appendChild(style);

      let counter = 3;
      const divDelSpan = document.createElement("div");
      divDelSpan.classList.add("play-game__contador-container");
      div.appendChild(divDelSpan);

      state.getPlayerPoints();

      const intervalId = setInterval(() => {
        divDelSpan.textContent = counter.toString();
        counter--;
        if (counter < 1) {
          clearInterval(intervalId);

          setTimeout(() => {
            state.renderAnimationCombat();
          }, 500);

          setTimeout(() => {
            state.renderGanador();
            state.setMyEmptyPlayOnline();
          }, 4000);
        }
      }, 1000);
    }
    addListeners() {}
  }
);
