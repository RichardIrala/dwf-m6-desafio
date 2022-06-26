import { state } from "../../state";

customElements.define(
  "header-in-game-el",
  class extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    constructor() {
      super();
      this.render();
    }
    render() {
      this.shadow.innerHTML = ``;
      const playerNames = state.getPlayerNames();
      const div = document.createElement("div");
      div.classList.add("position-gral-div");
      div.classList.add("size-gral-div");
      div.classList.add("grid-2c-centred");

      div.innerHTML = /*html*/ `
        <div class="flex-row">
            <span class="general-text">${playerNames.myName}: 0</span>
            <span class="general-text orange">${
              playerNames.enemyName
            }: 10</span>
        </div>
        <div class="flex-row">
            <span class="room">Sala</span>
            <span class="general-text">${state.getShortRoomId()}</span>
        </div>
        `;
      //
      this.shadow.appendChild(div);
      const style = document.createElement("style");
      style.innerHTML = /*css*/ `
          * {
            margin: 0;
            box-sizing: border-box;
          }
          .position-gral-div {
            position: absolute;
            top: 0;
            left: 0;
          }
          .size-gral-div {
            padding: 32px 10px;
            width: 100vw;
          }
          .grid-2c-centred {
            display: grid;
            grid-template-columns: 1fr 1fr;
            place-items: center;
            align-items: center;
          }

          .flex-row {
            display: flex;
            flex-direction: column;
            gap: 5px;
          }
          
          .general-text {
            font-size: 24px;
            font-weight: 600;
          }
          .orange {
            color: rgba(255, 100, 66, 1);
          }

          .room {
            font-size: 24px;
            font-weight: 700;
          }
        `;
      this.shadow.appendChild(style);
    }
  }
);
