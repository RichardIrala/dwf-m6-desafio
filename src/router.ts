import { Router } from "@vaadin/router";
// import "./pages/inicioGame";
import "./pages/welcome";
import "./pages/play-game";
import "./pages/join-room";
//este es el game-element
import "./pages/inicio-game-el";
import "./pages/welcome-game";
import "./pages/game-instructions";
import "./pages/waiting-players";
import "./pages/waiting-confirm-to-start";
import "./pages/play-game-online";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/", component: "welcome-el" },
  // { path: "/iii", component: "inicio-game-el" },
  { path: "/welcome-game", component: "welcome-game-el" },
  { path: "/inicio-game", component: "inicio-game-element" },
  { path: "/ingresar-a-una-sala", component: "join-room-el" },
  { path: "/waiting-players", component: "waiting-players-el" },
  { path: "/game-instructions", component: "game-instructions-el" },
  {
    path: "/waiting-confirm-to-start",
    component: "waiting-confirm-to-start-el",
  },
  { path: "/play-game", component: "play-game-el" },
  { path: "/play-game-online", component: "play-game-online-el" },
]);
// /play-game-online
