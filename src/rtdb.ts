import firebase from "firebase";
import lodash from "lodash";
import { state } from "./state";

const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
const app = firebase.initializeApp(firebaseConfig);

const db = firebase.database();
//Inicializando state
// state.init();
// state.subscribe(() => {
//   sessionStorage.setItem("state-chatrooms", JSON.stringify(state.getState()));
// });

//De aca hacia adelante podria incorporarlo al state, así cada vez que se setee un roomRef, se ejecute toda esta línea hasta el final.

const chatroomsRef = db.ref(`/rooms/321321`);
// console.log(roomLongId);

//Este método indica a chatroomsRef que escuche los cambios en /chatrooms
chatroomsRef.on("value", (snapshot) => {
  console.log("puta");
  const valor = snapshot.val();
  // console.log(valor);
  const arrayValor = lodash.map(valor);
  console.log(arrayValor);
});
