import firebase from "firebase";

import { state } from "./state";

const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
const app = firebase.initializeApp(firebaseConfig);

export const rtdbFrontEnd = firebase.database();
//Inicializando state
// state.init();
// state.subscribe(() => {
//   sessionStorage.setItem("state-chatrooms", JSON.stringify(state.getState()));
// });

//De aca hacia adelante podria incorporarlo al state, así cada vez que se setee un roomRef, se ejecute toda esta línea hasta el final.
