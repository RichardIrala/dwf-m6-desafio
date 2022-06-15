import { Router } from "@vaadin/router";
import "./pages/inicioGame";
import "./pages/game-instructions";
import "./pages/play-game";
import "./pages/welcome";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/", component: "welcome-el" },
  { path: "/inicio-game", component: "inicio-game-el" },
  { path: "/game-instructions", component: "game-instructions-el" },
  { path: "/play-game", component: "play-game-el" },
]);
