import { Router } from "@vaadin/router";
import Swal from "sweetalert2";

const fondoDelJuego = require("url:../../components/imgs/fondo.svg");

//Instrucciones del Ppot
customElements.define(
  "game-instructions-el",
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
        <p class="instructions">Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.</p>
        <game-button-blue>¡Jugar!</game-button-blue>
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
        .instructions {
            width: 317px;
            font-size: 40px;
            font-weight: 600;
            text-align: center;
        }
      `;

      this.shadow.appendChild(div);
      this.shadow.appendChild(style);
    }
    addListeners() {
      this.shadow
        .querySelector("game-button-blue")
        .addEventListener("click", () => {
          //Aquí estan los colores de los botones de las alertas, para cambiar directamente en la constante y que se apliquen
          const colorConfirmar = "rgba(0, 144, 72, 1)";
          const colorDenegar = "rgba(0, 108, 252, 1)";
          Swal.fire({
            title: "¿Quieres comenzar a jugar?",
            confirmButtonText: "Si, quiero continuar",
            confirmButtonColor: colorConfirmar,
            showDenyButton: true,
            denyButtonText: `No, aun no quiero jugar`,
            denyButtonColor: colorDenegar,
          }).then((result) => {
            /* Etapa de confirmación, degenación o click en la pantalla sin responder */
            if (result.isConfirmed) {
              Swal.fire({
                title: "¡A jugar!",
                showConfirmButton: true,
                confirmButtonText: "Buenisimo",
                confirmButtonColor: colorConfirmar,
              }).then((result) => {
                if (result) {
                  //Luego de confirmar y sacar el cartel de "Buenisimo" o darle al boton, lleva directamente al juego
                  Router.go("/play-game");
                }
              });
            } else if (result.isDenied) {
              // En caso de darle a la opción NO de la alerta se lanza esta alerta
              Swal.fire("Cuando estes listo entonces...", "", "warning");
            } else {
              //En caso de darle click a la pantalla sin elegir ninguna de las opciones se lanza esta alerta
              Swal.fire("Necesito que elijas una de las opciones", "", "error");
            }
          });
        });
    }
  }
);
