import { rtdbFrontEnd } from "./rtdb";
import lodash from "lodash";
import { Router } from "@vaadin/router";

const tijera = require("url:./components/imgs/tijera.svg");
const piedra = require("url:./components/imgs/piedra.svg");
const papel = require("url:./components/imgs/papel.svg");
const state = {
  data: {
    resultRender: "",
    shortRoomId: "",
    roomRef: "",
    rtdbData: {},
    me: {},
    scores: { me: "", enemy: "" },
    myPlayerNumber: "",
    enemyPlayerNumber: "",
    enemyName: "",
  },
  listeners: [],

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

  addPuntos() {
    //CHEQUEAR ESTE METODO 26/06/2022
    //El juego ya esta casi finalizado, solo falta esto y luego limpiar código viejo. Y ordenar el código + optimizar lo que se pueda para mejor lectura y compresión de otros devs
    const cs = state.getState();
    const realRoomId = cs.roomRef;
    const userId = cs.me.userId;
    const userName = cs.me.userName;
    const raw = JSON.stringify({ userName });
    fetch(`/rooms/${realRoomId}/addScore?userId=${userId}`, {
      method: "POST",
      body: raw,
      headers: { "content-type": "application/json" },
    });
  },
  setRenderResultsOnChange(callback) {
    const cs = this.getState();
    cs.resultRender = callback;
    this.saveData(cs);
  },
  renderResultsOnChange() {
    const cs = this.getState();
    cs.resultRender();
  },

  renderAnimationCombat() {
    const root = document.querySelector(".root");
    const style = document.createElement("style");
    style.innerHTML = `
    * {
      margin: 0;
      box-sizing: border-box;
    }
    .container-animation-combat {
      height: 100vh;
      width: 100vh;
      overflow: hidden;
    }
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
    const jugadas = this.getState().rtdbData;
    const miPlayerNumber = Number(this.getState().myPlayerNumber - 1);
    const enemyPlayerNumber = Number(this.getState().enemyPlayerNumber) - 1;
    function pcPlay() {
      if (jugadas[enemyPlayerNumber].choice == "piedra") {
        return piedra;
      } else if (jugadas[enemyPlayerNumber].choice == "papel") {
        return papel;
      } else if (jugadas[enemyPlayerNumber].choice == "tijera") {
        return tijera;
      }
    }
    function playerPlay() {
      if (jugadas[miPlayerNumber].choice == "piedra") {
        return piedra;
      } else if (jugadas[miPlayerNumber].choice == "papel") {
        return papel;
      } else if (jugadas[miPlayerNumber].choice == "tijera") {
        return tijera;
      }
    }
    const pcPlayImage = pcPlay();
    const playerPlayImage = playerPlay();
    // console.log(jugadas, "sSOMOSMOSMOS");
    if (
      jugadas[enemyPlayerNumber].choice != "" &&
      jugadas[miPlayerNumber].choice != ""
    ) {
      root.innerHTML = `
      <div class="container-animation-combat">
        <img class="pc-play-now" src=${pcPlayImage}>
        <img class="pc-play-fast" src=${pcPlayImage}>
        <img class="player-play-now" src=${playerPlayImage}>
        <img class="player-play-fast" src=${playerPlayImage}>
      </div>
    `;
    } else {
      root.innerHTML = `<alguien-no-eligio-el></alguien-no-eligio>`;
    }

    root.appendChild(style);
  },

  renderGanador() {
    const root = document.querySelector(".root");
    root.innerHTML = ``;
    //
    const jugadas = this.getState().rtdbData;
    const myPlayerNumber = Number(this.getState().myPlayerNumber - 1);
    const enemyPlayerNumber = Number(this.getState().enemyPlayerNumber) - 1;
    const victoriaConPiedra = [
      jugadas[myPlayerNumber].choice == "piedra" &&
        jugadas[enemyPlayerNumber].choice == "tijera",
    ];

    const victoriaConPapel = [
      jugadas[myPlayerNumber].choice == "papel" &&
        jugadas[enemyPlayerNumber].choice == "piedra",
    ];
    const victoriaConTijera = [
      jugadas[myPlayerNumber].choice == "tijera" &&
        jugadas[enemyPlayerNumber].choice == "papel",
    ];
    const victoria = [victoriaConPiedra, victoriaConPapel, victoriaConTijera]
      .toString()
      .includes("true");
    //
    const empateConPiedra = [
      jugadas[myPlayerNumber].choice == "piedra" &&
        jugadas[enemyPlayerNumber].choice == "piedra",
    ];
    const empateConPapel = [
      jugadas[myPlayerNumber].choice == "papel" &&
        jugadas[enemyPlayerNumber].choice == "papel",
    ];
    const empateConTijera = [
      jugadas[myPlayerNumber].choice == "tijera" &&
        jugadas[enemyPlayerNumber].choice == "tijera",
    ];
    const empate = [empateConPapel, empateConPiedra, empateConTijera]
      .toString()
      .includes("true");
    //
    const derrotaConPiedra = [
      jugadas[myPlayerNumber].choice == "piedra" &&
        jugadas[enemyPlayerNumber].choice == "papel",
    ];
    const derrotaConPapel = [
      jugadas[myPlayerNumber].choice == "papel" &&
        jugadas[enemyPlayerNumber].choice == "tijera",
    ];
    const derrotaConTijera = [
      jugadas[myPlayerNumber].choice == "tijera" &&
        jugadas[enemyPlayerNumber].choice == "piedra",
    ];
    const derrota = [derrotaConPiedra, derrotaConPapel, derrotaConTijera]
      .toString()
      .includes("true");

    if (victoria.toString() == "true") {
      //Si ganas, agregas un punto a tu score en la base de datos
      this.addPuntos();
      root.innerHTML = `<game-results>Ganaste</game-results>`;
    } else if (empate.toString() == "true") {
      root.innerHTML = `<game-results>Empate</game-results>`;
    } else if (derrota.toString() == "true") {
      //En este caso perdiste.

      root.innerHTML = `<game-results>Perdiste</game-results>`;
    } else {
      root.innerHTML = `<game-results>Uno de ustedes no eligio</game-results>`;
    }
  },
  async setRoomRef(realRoomId) {
    //ID de room en la realtimeDB
    const cs = this.getState();
    cs.roomRef = realRoomId;
    this.saveData(cs);
  },
  async listenDatabase() {
    // rtdbFrontEnd;
    const currentGameRef = rtdbFrontEnd.ref(
      `/rooms/${this.data.roomRef}/currentGame`
    );
    // console.log(roomLongId);

    //Este método indica a currentGameRef que escuche los cambios en /currentGame
    currentGameRef.on("value", (snapshot) => {
      const cs = this.getState();
      const valor = snapshot.val();
      const currentGame = lodash.map(valor);
      console.log(currentGame);
      console.log("lo anterior es lo de la rtdb");
      cs.rtdbData = currentGame;
      this.saveData(cs);

      const pathInicioGame = "/inicio-game";
      const pathSalaDeEspera = "/waiting-players";
      const pathDelJuego = "/game-instructions";
      const pathActual = window.location.pathname;
      const pathIngresarAUnaSala = "/ingresar-a-una-sala";
      const pathDeEleccionDePPOT = "/play-game-online";
      this.setEnemyName();

      if (
        currentGame[0].online == true &&
        currentGame[1]?.online == true &&
        (pathActual == pathIngresarAUnaSala || pathActual == pathSalaDeEspera)
      ) {
        //corregir problema
        console.log("INGRESANDO AL JUEGO");
        Router.go(pathDelJuego);
      } else if (
        pathActual != pathSalaDeEspera &&
        pathActual != pathDelJuego &&
        (pathActual == pathIngresarAUnaSala || pathActual == pathInicioGame)
      ) {
        console.log("INGRESANDO A UNA SALA DE ESPERA BRO");
        Router.go(pathSalaDeEspera);
      }

      if (
        cs.rtdbData[0].start == true &&
        cs.rtdbData[1].start == true &&
        pathActual != pathDeEleccionDePPOT
      ) {
        Router.go(pathDeEleccionDePPOT);
      }

      // this.checkStartValues();
    });
  },
  async getPlayerPoints() {
    const cs = this.getState();
    const userName = cs.me.userName;
    const enemyName = cs.enemyName;
    const scoresRef = rtdbFrontEnd.ref(`/rooms/${this.data.roomRef}/scores`);
    this.checkScoresInRealTime(scoresRef, userName, enemyName);
    return { message: "Valores Agregados al STATE" };
    // const puntosRetornados = scoresRef.get().then((snap) => {
    //   const snapVal = snap.val();
    //   const misPuntos = snapVal[userName];
    //   const susPuntos = snapVal[enemyName];
    //   const puntos = { me: misPuntos, enemy: susPuntos };
    //   return puntos;
    // });

    // return puntosRetornados;
  },
  saveData(rtdbData) {
    this.setState(rtdbData);
  },
  //CHEQUEAR BIEN ESTE METODO
  checkScoresInRealTime(ref, myName, enemyName) {
    console.log(
      "%cQUE PASA QUE NO FUNCIONO LRPTM; QUE LO RE MIL PAR",
      "color: blue"
    );
    ref.on("value", (snapshot) => {
      const snapVal = snapshot.val();
      const cs = this.getState();

      //RETORNADOR DE SCORES A ULTIMO MOMENTO.
      cs.scores.me = snapVal[myName] ? snapVal[myName] : 0;
      cs.scores.enemy = snapVal[enemyName] ? snapVal[enemyName] : 0;
      this.saveData(cs);
      this.renderResultsOnChange();
    });
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
  signup(email, nombre) {
    console.log("soy el state");
    const raw = JSON.stringify({ email, nombre });
    fetch("/signup", {
      method: "POST",
      body: raw,
      headers: { "content-type": "application/json" },
    })
      .then((data) => data.json())
      .then((jsonData) => {
        if (jsonData.new) {
          Router.go("/welcome-game");
          alert(
            "Usuario registrado, por favor ahora ingrese con su nuevo usuario."
          );
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
          //ACA AGREGO EL DATA.ROOM porque se confirma la existencia de la room y con eso basta
          this.setShortRoomId(id);
          const realRoomId = resJson.roomLongId;
          fetch("/rooms/" + realRoomId + `?userId=${userId}`, {
            method: "POST",
          })
            .then((res) => res.json())
            .then((resJson) => {
              //En este caso si la sala existe, se chequea si el jugador puede participar en la sala, en caso de no poder. Deberia existir resJson.notFound. Caso contrario el jugador ingresara a la sala
              if (resJson.notFound) {
                alert(resJson.notFound);
              } else {
                console.log(
                  id,
                  "soy el ID de la sala luego de crear o querer ingresar a una sala, buenos dias :3"
                );

                if (resJson.player) {
                  cs.myPlayerNumber = resJson.player;
                  function setEnemyNumber(myPlayerNumber) {
                    if (myPlayerNumber == 1) {
                      return 2;
                    } else if (myPlayerNumber == 2) {
                      return 1;
                    } else {
                      alert(
                        "Hay un problema para identificar qué jugador es cada uno"
                      );
                    }
                  }
                  cs.enemyPlayerNumber = setEnemyNumber(cs.myPlayerNumber);
                  console.log(cs.enemyPlayerNumber, "soy el enemigo");
                  this.setRoomRef(realRoomId);
                  this.listenDatabase();
                }
              }
            }); /*Probando si catch toma como error un 404, en este caso del endpoint de seteo de estado en una sala */
        } else {
          alert(resJson.message);
        }
      });
  },
  setEnemyName() {
    const cs = this.getState();
    cs.rtdbData.forEach((data) => {
      if (data.player != cs.me.userName) {
        cs.enemyName = data.player;
      }
    });

    this.saveData(cs);
  },
  getPlayerNames() {
    const cs = this.getState();
    return { myName: cs.me.userName, enemyName: cs.enemyName };
  },
  getRtdbData() {
    const cs = this.getState();
    return cs.rtdbData;
  },
  checkStartValues(actualPathname) {
    const rtdbData = this.getRtdbData();
    if (actualPathname == "/game-instructions") {
      checkValues();
    }

    function checkValues() {
      if (rtdbData[0].start == true && rtdbData[1].start == true) {
        console.log("Ambos son true");
      } else {
        console.log("Todavia no son los 2 true");
      }
    }
  },
  setReadyToPlay() {
    const pathEsperandoAmbosStarts = "/waiting-confirm-to-start";
    Router.go(pathEsperandoAmbosStarts);
    const cs = this.getState();
    const raw = JSON.stringify({ userName: cs.me.userName, status: true });
    fetch(`/rooms/${cs.roomRef}/set-start?userId=${cs.me.userId}`, {
      method: "post",
      headers: { "content-type": "application/json" },
      body: raw,
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
      });
  },
  async setStartFalse() {
    const cs = this.getState();
    const raw = JSON.stringify({ userName: cs.me.userName, status: false });
    fetch(`/rooms/${cs.roomRef}/set-start?userId=${cs.me.userId}`, {
      method: "post",
      headers: { "content-type": "application/json" },
      body: raw,
    }).catch((err) => {
      console.log(err);
    });
  },
  setMyPlayOnline(jugada: number) {
    const cs = this.getState();

    var myPlay;
    if (jugada == 0) {
      myPlay = "piedra";
    } else if (jugada == 1) {
      myPlay = "papel";
    } else if (jugada == 2) {
      myPlay = "tijera";
    }
    const userId = cs.me.userId;
    const roomLongId = cs.roomRef;
    const raw = JSON.stringify({ jugada: myPlay, userName: cs.me.userName });
    // console.log(raw);
    fetch(`/rooms/${roomLongId}/choice-play?userId=${userId}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: raw,
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson, "soy el resultado de elegir una jugada.");
      });
  },

  setMyEmptyPlayOnline() {
    const cs = this.getState();
    const userId = cs.me.userId;
    const roomLongId = cs.roomRef;
    const raw = JSON.stringify({ jugada: "", userName: cs.me.userName });
    // console.log(raw);
    fetch(`/rooms/${roomLongId}/choice-play?userId=${userId}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: raw,
    });
  },
  setShortRoomId(id) {
    const cs = this.getState();
    cs.shortRoomId = id;
    this.saveData(cs);
  },
  getShortRoomId() {
    const cs = this.getState();
    return cs.shortRoomId;
  },
};

export { state };
