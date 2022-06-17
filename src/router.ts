import { Router } from "@vaadin/router";
// import "./pages/inicioGame";
import "./pages/game-instructions";
import "./pages/play-game";
import "./pages/welcome";
//este es el game-element
import "./pages/inicio-game-el";
import "./pages/welcome-game";
import "./pages/join-room";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/", component: "welcome-el" },
  // { path: "/iii", component: "inicio-game-el" },
  { path: "/welcome-game", component: "welcome-game-el" },
  { path: "/inicio-game", component: "inicio-game-element" },
  { path: "/ingresar-a-una-sala", component: "join-room-el" },
  { path: "/play-game", component: "play-game-el" },
  { path: "/game-instructions", component: "game-instructions-el" },
]);
