customElements.define(
  "game-button-blue",
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
      `;
      this.shadow.appendChild(style);
    }
    render() {
      const button = document.createElement("button");
      button.textContent = this.textContent;
      this.shadow.appendChild(button);
    }
  }
);
