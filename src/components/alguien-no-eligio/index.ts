const rocaSeria = require("url:../imgs/roca-seria.jpg");
customElements.define(
  "alguien-no-eligio-el",
  class extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    constructor() {
      super();
      this.render();
    }
    render() {
      this.shadow.innerHTML =
        /*html*/
        `<div class="contenedor-padre">
          <span>¡Uno de uds. no eligió!</span>
          <img class="roca-seria" src=${rocaSeria} alt="roca-seria">
        </div>`;
      const style = document.createElement("style");
      style.innerHTML =
        /*css*/
        `
        * {
          box-sizing: border-box;
          margin: 0;
        }

        .contenedor-padre {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 20px;
          width: 100vw;
          height: 100vh;
          background: black;
        }
        .contenedor-padre span {
          font-size: 32px;
          color: white;
        }

        .roca-seria {
          width: 300px;
          height: auto;
        }
        @media (min-width: 768px) {
          .roca-seria {
            width: 500px;
          }
        }
        @media (min-width: 1200px) {
          .roca-seria {
            width: 800px;
          }
        }
       `;
      this.shadow.appendChild(style);
    }
  }
);
