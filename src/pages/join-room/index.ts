import { Router } from "@vaadin/router";
import { state } from "../../state";

const fondoDelJuego = require("url:../../components/imgs/fondo.svg");
//SEGUIR CON ESTA PAGINA, HACER QUE ESTA PAGINA SE TRANSFORME ENTRE ENTRAR A UN ROOM Y CREAR ROOM
//Inicio el juego de piedra papel o tijeras
customElements.define(
  "join-room-el",
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
        <form class="form-new-room">
            
            <label class="form-new-room__roomId--label">
                <span>Id de la sala</span>
                <input type="number" placeholder="1923" name="roomId" class="form-new-room__myname"/>
                <span class="form-alert display--none">Necesitas completar todas las casillas</span>
            </label>

            <button class="submit-button" type="submit">
                <game-button-blue class="ir-a">Empezar</game-button-blue>
            </button>
        </form>
        <homepage-icon></homepage-icon>
      `;
      style.innerHTML = `
        * { 
            box-sizing: border-box;
        }
        .principal-container {
          background: url(${fondoDelJuego});
          background-size: cover;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 74px;
          gap: 50px;
          padding-top: 115px;
        }
        .form-new-room {
            display: flex; 
            flex-direction: column;
            gap: 20px;
            font-size: 45px;
        }
        .form-new-room__roomId--label {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .form-new-room__myname {
            width: 322px;
            font-size: 45px;
            border: solid rgba(24, 36, 96, 1);
            padding-top: 10px;
            padding-bottom: 10px;
            text-align: center;
        }
        .submit-button {
            padding: 0;
            border: none;
        }


        .display--none {
          display: none;
        }
        .display--initial {
          display: initial;
        }
        .form-alert {
          margin-top: 5px;
          color: red;
          font-size: 16px;
        }
      `;
      this.shadow.appendChild(div);
      this.shadow.appendChild(style);
    }
    addListeners() {
      this.shadow
        .querySelector(".form-new-room")
        .addEventListener("submit", (e) => {
          e.preventDefault();
          if (e.target["roomId"].value != "") {
            //roomId es el name del input del formulario
            const roomId = e.target["roomId"].value;
            state.joinRoom(roomId);
            // Router.go("/inicio-game");
          } else {
            //Alerta de que faltan casillas
            const formAlert = this.shadow.querySelectorAll(".display--none");
            formAlert.forEach((input) => {
              if (input.classList.contains("display--initial") == false) {
                input.classList.add("display--initial");
              }
            });
          }
        });
    }
  }
);
