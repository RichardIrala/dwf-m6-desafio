customElements.define(
  "game-title",
  class extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    constructor() {
      super();
      this.render();
      const style = document.createElement("style");
      style.innerHTML = `
        .title {
          font-size: 80px;
          color: rgba(0, 144, 72, 1);
        }
        .opacity-less {
          color: rgba(145, 204, 175, 1);
        }
      `;
      this.shadow.appendChild(style);
    }
    render() {
      const div = document.createElement("div");
      div.innerHTML = `
        <span class="title">Piedra <br>
        Papel <span class="opacity-less">ó</span> <br> 
        Tijera</span>
      `;
      //
      this.shadow.appendChild(div);
    }
  }
);
