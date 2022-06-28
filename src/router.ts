import { Router } from "@vaadin/router";
import "./pages/welcome";
import "./pages/join-room";
import "./pages/inicio-game-el";
import "./pages/welcome-game";
import "./pages/game-instructions";
import "./pages/waiting-players";
import "./pages/waiting-confirm-to-start";
import "./pages/play-game-online";
import "./pages/signup";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/", component: "welcome-el" },
  { path: "/welcome-game", component: "welcome-game-el" },
  { path: "/signup", component: "signup-el" },
  { path: "/inicio-game", component: "inicio-game-element" },
  { path: "/ingresar-a-una-sala", component: "join-room-el" },
  { path: "/waiting-players", component: "waiting-players-el" },
  { path: "/game-instructions", component: "game-instructions-el" },
  {
    path: "/waiting-confirm-to-start",
    component: "waiting-confirm-to-start-el",
  },
  { path: "/play-game-online", component: "play-game-online-el" },
]);
