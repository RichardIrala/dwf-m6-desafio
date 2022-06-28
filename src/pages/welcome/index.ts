import { Router } from "@vaadin/router";

const computadoraIcon = require("url:../../components/imgs/computadora-icon.svg");
const submitIcon = require("url:../../components/imgs/submit-icon.svg");
const cursorIcon = require("url:../../components/imgs/cursor-icon.svg");
const notesIcon = require("url:../../components/imgs/notes-icon.svg");
const formIcon = require("url:../../components/imgs/form-icon.svg");
//infoColumns es el objeto que permite editar el cuadro con columnas en está página. Se utiliza para no requerir usar código cuando quiera hacer cambios como quitar o restar infor del cuadro.
const infoColumns = [
  {
    title: "Un juego de piedra papel o tijera",
    image: cursorIcon,
    description:
      "Este juego consta de jugar 1v1 contra la computadora al típico juego de piedra papel y tijeras",
    number: 1,
  },
  {
    title: "Contactame",
    image: formIcon,
    description: "Por el momento esta página no esta disponible...",
    number: 3,
  },
];

//Esta es la página de bienvenida, con mi presentación, el desafio no lo pide pero es un extra que le agregue, sumado a la page de notas con tareas y el formulario de contacto
customElements.define(
  "welcome-el",
  class extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    constructor() {
      super();
      this.render();
      this.addListeners();
    }
    render() {
      this.shadow.innerHTML = ``;
      const divPadre = document.createElement("div");
      // divPadre.classList.add("div-padre");
      const buttonEl = document.createElement("button");
      buttonEl.textContent = `Inicio Game`;
      buttonEl.addEventListener("click", () => {
        console.log("a");
        Router.go("/game-welcome");
      });
      //
      const divTEMPORAL = document.createElement("div");
      divTEMPORAL.innerHTML = /*html */ `
        <div class="header-all-content-container">

          <div class="header--my-name-container">
            <span>Richard Miguel Irala</span>
            <img class="computadora-icon" src=${computadoraIcon} alt="computadora logo">
          </div>

          <form class="header__form">
            <div class="header__form__inputs">
              <select class="header__form__inputs--select" name="headerForm">
                <option value="jugar" selected>Jugar Piedra papel o Tijeras</option>
                <option value="contactarme">Contactarme</option>
              </select>
              <input class="submit-icon" type="image" src=${submitIcon}>
            </div>
            <div class="header__form__spanText">
            <span>Elige una de las opciones y presiona el botón</span>
            </div>
          </form>

        </div>

        <div class="main-container">

          <div class="main-columns">
            <h2 class="main-columns__titulo color-white">Esta página tiene distintas funcionalidades</h2>
            ${infoColumns
              .map((element) => {
                console.log("Iteracion ");
                return `
                <div class="main-column">

                  <div class="main-column__number main-column__column--content color-white">
                    <span>${element.number}</span>
                  </div>

                  <div class="main-column__titulo main-column__column--content color-white">
                    <h3>${element.title}</h3>
                  </div>

                  <div class="main-column__C main-column__column--content color-white">
                    <img class="main-column__imagen" src=${element.image} alt="">
                    <span>${element.description}<span>
                  </div>
              
              </div>
                `;
              })
              .join("")}
            
          </div>
        </div>
      `;
      // divPadre.appendChild(buttonEl);
      divPadre.appendChild(divTEMPORAL);
      this.shadow.appendChild(divPadre);
      const style = document.createElement("style");
      style.innerHTML = `
    * {
      margin: 0px;
      box-sizing: border-box;
    }

    .header-all-content-container {
      background: rgba(0, 144, 72, 1);
      color: white;
      padding: 20px;
      display: grid;
      grid-template-rows: auto auto;
      justify-content: center;
      justify-items: center;
      gap: 5px;
    }

    .header--my-name-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: fit-content;
    }

    .computadora-icon {
      width: 60px;
      margin-top: 10px;
    }


    .header__form {
      display: flex;
      flex-direction: column;
    }

    .header__form__inputs {
      display: flex;
      align-items: center;
      transform: translate(50px, 0);
    }

    .header__form__inputs--select {
      height: 40px;
      width: 200px;
    }

    .submit-icon {
      width: 50px; height: 50px;
      transform: rotate(180deg);

    }

    .header__form__spanText {
      text-align: center;
    }


    .main-container {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background: grey;
      min-height: 100vh;
      padding: 40px 0;
    }

    .main-columns__titulo {
      background: rgba(0, 144, 72, 1);
      border: solid black;
      font-size: 20px;
      padding: 10px;
      width: 300px;
      text-align: center;
    }
    @media (min-width: 480px) {
      .main-columns__titulo {
        width: 440px;
      }
    }

    .main-column {
      display: grid;
      grid-template:
        "number titulo" 50px
        "number imagen" 300px /
        40px 260px
    }
    @media (min-width: 480px) {
      .main-column {
        grid-template:
          "number titulo" 50px
          "number imagen" 400px /
          40px 400px
      }
    }

    .color-white {
      color: white;
    }

    .main-column__imagen {
      width: 200px;
    }
    @media (min-width: 480px) {
      .main-column__imagen {
        width: 300px;
      }
    }

    .main-column__column--content {
      border: solid black; 
      display: flex; 
      justify-content: center; align-items: center;
    }

    .main-column__number { grid-area: number;  background: rgba(0, 144, 72,  1);}
    .main-column__titulo { grid-area: titulo;  background: rgba(0, 108, 252, 1);}
        .main-column__C { grid-area: imagen;   background: rgba(0, 108, 252, 1); flex-direction: column; padding: 20px; gap: 20px;}
  `;
      divPadre.appendChild(style);
    }
    addListeners() {
      this.shadow
        .querySelector(".header__form")
        .addEventListener("submit", (e) => {
          e.preventDefault();
          const valorDelForm = e.target["headerForm"].value;
          if (valorDelForm == "contactarme") {
            Router.go("/play-game");
            console.log("CONTACTADOWEY");
          } else if (valorDelForm == "jugar") {
            Router.go("/welcome-game");
          } else if (valorDelForm == "anotador") {
          }
        });
    }
  }
);
