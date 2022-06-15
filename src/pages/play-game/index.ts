import { state } from "../../state";

const fondoDelJuego = require("url:../../components/imgs/fondo.svg");

//Juego de piedra papel o tijeras
customElements.define(
  "play-game-el",
  class extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    constructor() {
      super();
      //Renderiza el customElement
      this.render();
      //Lo utilizo para agregar eventListeners necesarios para que mi CustomElement haga ciertas acciones.
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
        .play-game__contador-container {
          display: flex; justify-content: center; align-items: center;
          width: 243px; height: 243px;
          font-size: 64px;
          position: absolute; top: 50%; transform: translate(0 , -50%);
          border-radius: 50%;
          background: red;
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
      state.resetJugadas();
      const intervalId = setInterval(() => {
        divDelSpan.textContent = counter.toString();
        counter--;
        if (counter < 1) {
          clearInterval(intervalId);

          setTimeout(() => {
            //Se remueve el contador 3-2-1
            div.removeChild(divDelSpan);
            //Se renderiza la animación de las elecciones de cada jugador
            state.renderAnimationCombat();
            /* state.consola(); */
          }, 500);

          setTimeout(() => {
            //Se renderiza la tabla que menciona quien gano, y muestra los puntos actuales de Victorias vs Derrotas
            state.renderGanador();
            /* state.consola(); */
          }, 4000);
        }
      }, 1000);

      //state.resultado y state.getJugada
    }
    addListeners() {}
  }
);
