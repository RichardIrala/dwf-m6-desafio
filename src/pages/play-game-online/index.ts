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

      const style = document.createElement("style");
      this.shadow.innerHTML = `
      <div class="principal-container">
        <div></div>
        <div class="counter-container"></div>
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

        .play-game__contador-container {
          display: flex; justify-content: center; align-items: center;
          width: 243px; height: 243px;
          font-size: 64px;
          
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
      `;

      this.shadow.appendChild(style);

      let counter = 3;
      const divDelSpan = document.createElement("div");
      divDelSpan.classList.add("play-game__contador-container");
      this.shadow.querySelector(".counter-container").appendChild(divDelSpan);

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
