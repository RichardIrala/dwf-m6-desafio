import { Router } from "@vaadin/router";
const homepageIcon = require("url:../imgs/homepage.svg");
customElements.define(
  "homepage-icon",
  class extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    constructor() {
      super();
      this.render();
      const style = document.createElement("style");
      style.innerHTML = `
        * {
            box-sizing: border-box;
            margin: 0;
        }
        button {
          background: rgba(0, 108, 252, 1);
          border: 10px solid;
          border-radius: 4px;
          border-color: rgba(0, 25, 151, 1);
          min-width: 322px;
          min-height: 87px;
          color: rgba(216, 252, 252, 1);
          font-size: 45px;
          padding: 18px 0px;
        }
        button:hover {
          cursor: pointer;
        }
        .homepage-icon {
          width: 80px;
          position: fixed;
          right: 2vw;
          top: 2vw;
        }
        .homepage-icon:hover {
          cursor: pointer;
          background: rgba(0, 144, 72, 1);
          border: solid black;
          border-radius: 50%;
          padding: 10px;
        }
      `;
      this.shadow.appendChild(style);
      this.addEventsOnClickComponent();
    }
    render() {
      console.log(homepageIcon);
      const div = document.createElement("div");
      div.innerHTML = `
      <img class="homepage-icon" src=${homepageIcon} alt="botón que lleva a la page welcome">
      `;
      this.shadow.appendChild(div);
    }
    addEventsOnClickComponent() {
      this.shadow
        .querySelector(".homepage-icon")
        .addEventListener("click", () => {
          Router.go("/");
        });
    }
  }
);
