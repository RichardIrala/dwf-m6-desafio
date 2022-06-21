import { rtdbFrontEnd } from "./rtdb";
import lodash from "lodash";
import { Router } from "@vaadin/router";

const piedra = require("url:./components/imgs/piedra.svg");
const papel = require("url:./components/imgs/papel.svg");
const tijera = require("url:./components/imgs/tijera.svg");
const state = {
  data: {
    roomRef: "",
    rtdbData: {},
    me: {},
    game: {
      play: {
        myPlay: "",
        computerPlay: "",
      },
      gamesStatus: {
        victorys: 0,
        losses: 0,
      },
      listeners: [],
    },
  },
  listeners: [],

  consola() {
    console.log(state.data.game.play);
  },
  init() {
    // Busco data existente en el sessionStorage
    const localData = JSON.parse(sessionStorage.getItem("mod6-desafio"));

    if (!localData) {
      // Si no hay data, que no haga nada
      return;
    }
    // Pero si la hay, que la setee en el estado
    this.setState(localData);
  },

  getState() {
    return this.data;
  },
  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      // console.log("SOy yo", cb);
      cb();
    }
  },

  subscribe(callback: (any) => any) {
    console.log("hecho");
    this.listeners.push(callback);
  },

  //A partir de aca estan todos los comandos del state para el juego
  resetJugadas() {
    // console.log("DHSAJDGHSAJ");
    const cs = this.getState();
    cs.game.play.myPlay = "";
    cs.game.play.computerPlay = "";
    console.log(cs);
    this.setState(cs);
  },
  setJugada(jugada: number) {
    const cs = this.getState();
    cs.game.play.computerPlay = "";
    cs.game.play.myPlay = "";
    var myPlay;
    if (jugada == 0) {
      myPlay = "piedra";
    } else if (jugada == 1) {
      myPlay = "papel";
    } else if (jugada == 2) {
      myPlay = "tijera";
    }
    cs.game.play.myPlay = myPlay;
    this.setState(cs);
  },

  computerSetJugada(jugada: number) {
    const cs = this.getState();
    var computerPlay;
    if (jugada == 0) {
      computerPlay = "piedra";
    } else if (jugada == 1) {
      computerPlay = "papel";
    } else if (jugada == 2) {
      computerPlay = "tijera";
    }
    cs.game.play.computerPlay = computerPlay;
    this.setState(cs);
    //Aca no necesito hacer el setState porque setJugada ya lo hace. Y ambas van de la mano
  },
  addPuntos(pointForWho: "pc" | "player") {
    const cs = this.getState();
    const gameStatus = cs.game.gamesStatus;
    if (pointForWho == "player") {
      gameStatus.victorys = gameStatus.victorys + 1;
      console.log(cs, "RESULTADO DE LAS VICTORIAS CS");
      this.setState(cs);
    } else if (pointForWho == "pc") {
      gameStatus.losses = gameStatus.losses + 1;
      console.log(cs, "RESULTADO DE LAS DERROTAS CS");
      this.setState(cs);
    } else {
      alert("error");
    }
  },

  renderAnimationCombat() {
    const root = document.querySelector(".root");
    const style = document.createElement("style");
    style.innerHTML = `
    .pc-play-now {
      position: absolute;
      top: -10vh;
      left: 50%;
      transform: rotate(180deg) translate(50%);
      height: 45vh;
      animation: pcMove 2s linear;
    }
    @keyframes pcMove {
      100% {
        top: 0;
      }
    }
    .pc-play-fast {
      position: absolute;
      top: -10vh;
      left: 50%;
      transform: rotate(180deg) translate(50%);
      height: 10vh;
      animation: pcMoveFast 2s linear;
      z-index: 2;
    }
    @keyframes pcMoveFast {
      100% {
        top: 100vh;
      }
    }
    .player-play-now {
      position: absolute;
      bottom: -10vh;
      left: 50%;
      transform: translate(-50%);
      height: 45vh;
      animation: playerMove 2s linear;
    }
    
    @keyframes playerMove {
      100% {
        bottom: 0;
      }
    }
    .player-play-fast {
      position: absolute;
      bottom: -10vh;
      left: 50%;
      transform: translate(-50%);
      height: 10vh;
      animation: playerMoveFast 2s linear;
    }
    @keyframes playerMoveFast {
      100% {
        bottom: 100vh;
      }
    }
    `;
    const jugadas = this.getState().game.play;
    function pcPlay() {
      if (jugadas.computerPlay == "piedra") {
        return piedra;
      } else if (jugadas.computerPlay == "papel") {
        return papel;
      } else {
        return tijera;
      }
    }
    function playerPlay() {
      if (jugadas.myPlay == "piedra") {
        return piedra;
      } else if (jugadas.myPlay == "papel") {
        return papel;
      } else {
        return tijera;
      }
    }
    // console.log(jugadas, "sSOMOSMOSMOS");
    jugadas.myPlay != ""
      ? (root.innerHTML = `
      <img class="pc-play-now" src=${pcPlay()}>
      <img class="pc-play-fast" src=${pcPlay()}>
      <img class="player-play-now" src=${playerPlay()}>
      <img class="player-play-fast" src=${playerPlay()}>
      `)
      : (root.innerHTML = `NO JUGASTE BRO`);
    root.appendChild(style);
  },

  renderGanador() {
    // for (const cb of this.listener) {
    //   cb();
    // }
    const root = document.querySelector(".root");
    root.innerHTML = ``;
    //
    const jugadas = this.getState().game.play;
    const victoriaConPiedra = [
      jugadas.myPlay == "piedra" && jugadas.computerPlay == "tijera",
    ];

    const victoriaConPapel = [
      jugadas.myPlay == "papel" && jugadas.computerPlay == "piedra",
    ];
    const victoriaConTijera = [
      jugadas.myPlay == "tijera" && jugadas.computerPlay == "papel",
    ];
    const victoria = [victoriaConPiedra, victoriaConPapel, victoriaConTijera]
      .toString()
      .includes("true");
    //
    const empateConPiedra = [
      jugadas.myPlay == "piedra" && jugadas.computerPlay == "piedra",
    ];
    const empateConPapel = [
      jugadas.myPlay == "papel" && jugadas.computerPlay == "papel",
    ];
    const empateConTijera = [
      jugadas.myPlay == "tijera" && jugadas.computerPlay == "tijera",
    ];
    const empate = [empateConPapel, empateConPiedra, empateConTijera]
      .toString()
      .includes("true");
    //
    const derrotaConPiedra = [
      jugadas.myPlay == "piedra" && jugadas.computerPlay == "papel",
    ];
    const derrotaConPapel = [
      jugadas.myPlay == "papel" && jugadas.computerPlay == "tijera",
    ];
    const derrotaConTijera = [
      jugadas.myPlay == "tijera" && jugadas.computerPlay == "piedra",
    ];
    const derrota = [derrotaConPiedra, derrotaConPapel, derrotaConTijera]
      .toString()
      .includes("true");

    //Si no selecciono nada la jugada de la computadora va a ser = a undefined ("")
    const computerActualPlay = state.getState().game.computerPlay;
    if (victoria.toString() == "true") {
      //ACA SE AGREGAN PUNTOS AL JUGADOR
      this.addPuntos("player");
      root.innerHTML = `<game-results>Ganaste</game-results>`;
    } else if (empate.toString() == "true") {
      root.innerHTML = `<game-results>Empate</game-results>`;
    } else if (derrota.toString() == "true") {
      //ACA SE AGREGAN PUNTOS A LA PC
      this.addPuntos("pc");
      root.innerHTML = `<game-results>Perdiste</game-results>`;
    } else {
      root.innerHTML = `<game-results>ELEGI ALGO</game-results>`;
    }
  },
  async setRoomRef(realRoomId) {
    //ID de room en la realtimeDB
    this.data.roomRef = realRoomId;
  },
  async listenDatabase() {
    // rtdbFrontEnd;
    const chatroomsRef = rtdbFrontEnd.ref(`/rooms/${this.data.roomRef}`);
    // console.log(roomLongId);

    //Este método indica a chatroomsRef que escuche los cambios en /chatrooms
    chatroomsRef.on("value", (snapshot) => {
      const cs = this.getState();
      const valor = snapshot.val();
      const currentGame = lodash.map(valor.currentGame);
      console.log(currentGame);
      console.log("lo anterior es lo de la rtdb");
      cs.rtdbData = currentGame;
      this.saveData(cs);
      if (currentGame.length == 2 || currentGame.length > 2) {
        console.log("Tu usuario no coincide con uno de la lista");
      } else {
        console.log(currentGame.length);
        console.log("Todavia hay espacio");
      }
    });
  },
  saveData(rtdbData) {
    this.setState(rtdbData);
  },

  auth(email, userName) {
    console.log("soy el state");
    const raw = JSON.stringify({ email, userName });
    fetch("/auth", {
      method: "POST",
      body: raw,
      headers: { "content-type": "application/json" },
    })
      .then((data) => data.json())
      .then((jsonData) => {
        if (jsonData.id && jsonData.userName) {
          const cs = this.getState();
          cs.me.userName = jsonData.userName;
          cs.me.userId = jsonData.id;
          this.saveData(cs);
          Router.go("/inicio-game");
        } else {
          alert(jsonData.message);
        }
      });
  },
  newRoom() {
    const cs = this.getState();
    const { userId, userName } = cs.me;

    const raw = JSON.stringify({ userId, userName });
    fetch("/rooms", {
      method: "POST",
      body: raw,
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        if (resJson.id ? true : false) {
          console.log(resJson.id, "estoy entrando con esto a joinRoom");
          this.joinRoom(resJson.id);
        } else {
          alert("hubo un problema creando la sala");
        }
      });
  },
  joinRoom(id) {
    const cs = this.getState();
    const userId = cs.me.userId;
    fetch("/room/" + id + `?userId=${userId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.roomLongId ? true : false) {
          const realRoomId = resJson.roomLongId;
          fetch("/rooms/" + realRoomId + `?userId=${userId}`, {
            method: "POST",
          })
            .then((res) => res.json())
            .then((resJson) => {
              console.log(resJson);
            });
        } else {
          alert(resJson.message);
        }
      });
  },
};

export { state };
