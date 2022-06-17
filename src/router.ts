import { Router } from "@vaadin/router";
import "./pages/inicioGame";
import "./pages/game-instructions";
import "./pages/play-game";
import "./pages/welcome";
//este es el game-element
import "./pages/inicio-game-el";
import "./pages/new-room-el";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/", component: "welcome-el" },
  { path: "/inicio-game", component: "inicio-game-el" },
  { path: "/game-instructions", component: "game-instructions-el" },
  { path: "/play-game", component: "play-game-el" },
  { path: "/i", component: "inicio-game-element" },
  { path: "/c", component: "new-room-el" },
]);
