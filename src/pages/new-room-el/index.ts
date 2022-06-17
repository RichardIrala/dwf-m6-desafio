import { Router } from "@vaadin/router";

const fondoDelJuego = require("url:../../components/imgs/fondo.svg");
//SEGUIR CON ESTA PAGINA, HACER QUE ESTA PAGINA SE TRANSFORME ENTRE ENTRAR A UN ROOM Y CREAR ROOM
//Inicio el juego de piedra papel o tijeras
customElements.define(
  "new-room-el",
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
            <label class="form-new-room__my-name--label">
                <span>Tu nombre</span>
                <input type="text" name="my-name"class="form-new-room__myname"/>
            </label>
            
            <button class="submit-button" type="submit">
                <game-button-blue class="ir-a">Empezar</game-button-blue>
            </button>
        </form>
        <ppot-el></ppot-el>
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
          padding-top: 115px;
        }
        .form-new-room {
            display: flex; 
            flex-direction: column;
            gap: 20px;
        }
        .form-new-room__my-name--label {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .form-new-room__myname {
            width: 322px;
            height: 98px;
            font-size: 45px;
        }
        .submit-button {
            padding: 0;
            border: none;
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
          //My-name es el name del input del formulario
          console.log(e.target["my-name"].value);
        });
    }
  }
);
