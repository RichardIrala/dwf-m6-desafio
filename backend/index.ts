import "dotenv/config";
import * as express from "express";
import { db, rtdb } from "./db";
import { v4 as uuidv4 } from "uuid";
// import * as cors from "cors";
const port = process.env.PORT || 3000;
const app = express();
// const port = process.env.PORT;
app.use(express.json());
// app.use(cors());

const usersCollection = db.collection("users");
const roomsCollection = db.collection("rooms");

//Permite hostear el index.html del front (por eso refiere a dist como objetivo)
app.use(express.static("dist"));

//NodeEnv devuelve el ambiente de desarrollo
app.get("/env", (req, res) => {
  res.json({ enviroment: process.env.NODE_ENV || "development" });
});

//Crear usuario
app.post("/signup", (req, res) => {
  const email = req.body.email;
  const nombre = req.body.nombre;
  usersCollection
    .where("email", "==", email)
    .get()
    .then((searchResponse) => {
      //si no existe el usuario hace esto
      if (searchResponse.empty) {
        usersCollection.add({ email, nombre }).then((newUserRef) => {
          res.json({ id: newUserRef.id, new: true });
        });
      }
      //Si existe, devuelve el id del mismo
      else {
        res.status(400).json({
          message: "User already exist",
        });
      }
      // console.log(searchResponse);
    });
});

//Loguearse, en ese caso solo con el email
app.post("/auth", (req, res) => {
  const { email, userName } = req.body;
  usersCollection
    .where("email", "==", email)
    .get()
    .then((searchResponse) => {
      //si no existe el usuario hace esto
      if (searchResponse.empty) {
        res.status(404).json({ message: "Not found" });
      } else if (searchResponse.docs[0].data().nombre != userName) {
        console.log(searchResponse.docs[0].data().nombre);
        console.log(userName);
        res.status(404).json({ message: "Bad Username" });
      } else {
        res.json({
          id: searchResponse.docs[0].id,
          userName: searchResponse.docs[0].data().nombre,
        });
      }
    });
});

//crear una sala
app.post("/rooms", (req, res) => {
  const { userId, userName } = req.body;
  usersCollection
    .doc(userId.toString())
    .get()
    .then((doc) => {
      if (doc.exists && userName != "") {
        const roomRef = rtdb.ref("rooms/" + uuidv4());
        roomRef
          .set({
            currentGame: {
              [userId]: {
                player: userName,
                choice: "",
                online: true,
                start: false,
              },
            },
            owner: userId,
          })
          .then(() => {
            const roomId = 1000 + Math.floor(Math.random() * 999);
            const roomLongId = roomRef.key;
            // console.log(roomRef.key);
            roomsCollection
              .doc(roomId.toString())
              .set({
                rtdbRoomId: roomLongId,
              })
              .then(() => {
                res.json({
                  id: roomId.toString(),
                });
              });
          });
      } else {
        res.status(401).json({
          message: "No existe",
        });
      }
    });
});

//Buscar un room y si existe te devuelve la info de la room de firestore
app.get("/room/:id", (req, res) => {
  const { userId } = req.query;
  const { id } = req.params;

  usersCollection
    .doc(userId.toString())
    .get()
    .then((doc) => {
      if (doc.exists) {
        roomsCollection
          .doc(id)
          .get()
          .then((snap) => {
            if (snap.exists) {
              const roomLongId = snap.data().rtdbRoomId;
              res.json({ roomLongId });
            } else res.json({ message: "No existe este room" });
          });
      } else {
        res.json({ message: "Este usuario no Existe" });
      }
    });
});

//Con este post se crea un "jugador" en una room especifica
//Este EndPoint solicita el userId como query param, un roomId como paraámetro este debe ser el roomIdReal el cual deberia estar guardado en el state
app.post("/rooms/:roomId", function (req, res) {
  const { userId } = req.query;
  // const id = uuidv4();
  // const fecha = Date.now();
  // const user = req.body.user;

  //Esto corrobora que le enviemos el queryParam userId
  usersCollection
    .doc(userId.toString())
    .get()
    .then((doc) => {
      if (doc.exists) {
        const userName = doc.data().nombre;
        rtdb
          .ref("rooms/" + req.params.roomId + "/currentGame")
          .get()
          .then((snap) => {
            if (snap.val()[userId.toString()]) {
              rtdb
                .ref("rooms/" + req.params.roomId + "/currentGame/" + userId)
                .set({
                  player: userName,
                  choice: "",
                  online: true,
                  start: false,
                })
                .then(() => {
                  res.json({
                    message:
                      "Player 1, creador de la sala. Este jugador no es sustituible",
                    player: 1,
                  });
                });
            } else if (
              snap.val().player2?.player == userName ||
              !snap.val().player2
            ) {
              const userName = doc.data().nombre;
              //aca lo que hacemos es crear los datos de juego con el userId para que nunca se repita, todo dentro de currentGame
              rtdb
                .ref("/rooms/" + req.params.roomId + "/currentGame/player2")
                .set(
                  {
                    player: userName,
                    choice: "",
                    online: true,
                    start: false,
                    // date: fecha,
                  },
                  function () {
                    res.json({ message: "Hola jugador 2", player: 2 });
                  }
                );

              console.log("Jugador actualizado");
            } else {
              res.status(404).json({
                message:
                  "Tu usuario existe, pero tu nombre no coincide con ninguno de los participantes registrados",
              });
            }
          });
      } else {
        res.json({ message: "Necesito que me envies un usuario valido" });
      }
    });

  //este parametro roomId se refiere al verdadero ID el cual se adquiere con el EndPoint GetRealRoomId
});

//Elegir Jugada. Requiere el realRoomId, el userId como query param, la jugada y el userName en el body.
app.post("/rooms/:roomId/choice-play/", (req, res) => {
  const { userId } = req.query;
  const { jugada, userName } = req.body;
  usersCollection
    .doc(userId.toString())
    .get()
    .then((doc) => {
      if (doc.exists) {
        rtdb
          .ref("rooms/" + req.params.roomId + "/currentGame")
          .get()
          .then((snap) => {
            if (snap.val()[userId.toString()]) {
              rtdb
                .ref("rooms/" + req.params.roomId + "/currentGame/" + userId)
                .update({ choice: jugada })
                .then(() => {
                  res.json({ message: "jugado jugador 1" });
                });
            } else if (snap.val().player2.player == userName) {
              rtdb
                .ref("rooms/" + req.params.roomId + "/currentGame/player2")
                .update({ choice: jugada })
                .then(() => {
                  res.json({ message: "jugado jugador 2" });
                });
            } else {
              res.json({
                message:
                  "Tu usuario existe, pero tu nombre no coincide con ninguno de los participantes",
              });
            }
          });
      } else {
        res.json({ message: "este usuario no existe" });
      }
    });
});

app.post("/rooms/:roomId/set-start", (req, res) => {
  const { roomId } = req.params;
  const { userId } = req.query;
  usersCollection
    .doc(userId.toString())
    .get()
    .then((doc) => {
      if (doc.exists) {
        const sala = rtdb.ref("/rooms/" + roomId + "/currentGame");
        sala.get().then((snap) => {
          const valor = snap.val();
          if (valor[userId.toString()]) {
            //Corrobora si sos el player 1
            const player1Ref = rtdb.ref(
              "/rooms/" + roomId + "/currentGame/" + userId.toString()
            );
            player1Ref.update({ start: true });
            res.json({ message: "Hola player 1. Estamos listos :D" });
          } else if (doc.data().nombre == "mica2") {
            //corrobora si sos el player 2, comparandote con el nombre del jugador 2
            const player2Ref = rtdb.ref(
              "/rooms/" + roomId + "/currentGame/player2"
            );
            player2Ref.update({ start: true });
            res.json({ message: "Hola player 2. Estamos listos :D" });
          } else {
            //dado el caso de que tu usuario si exista, pero no seas ninguno de los participantes te da un 404 not found
            res.status(404).json({
              message: "Usted no coincide con ninguno de los participantes",
            });
          }
        });
      } else {
        //Este usuario no existe.
        res.status(404).json({ message: "Este usuario no existe" });
      }
    });
});
app.post("/rooms/:roomId/addScore", (req, res) => {
  const { roomId } = req.params;
  const { userName } = req.body;
  const { userId } = req.query;
  usersCollection
    .doc(userId.toString())
    .get()
    .then((doc) => {
      if (doc.exists) {
        const scoresRef = rtdb.ref(`/rooms/${roomId}/scores`);
        scoresRef.get().then((snap) => {
          const valores = snap.val();
          if (valores[userName]) {
            scoresRef
              .update({
                [userName]: valores[userName] + 1,
              })
              .then(() => {
                res.json({ message: "UPDATEADO XD" });
              });
          } else {
            scoresRef.update({ [userName]: 1 }).then(() => {
              res.json({ message: "No existia pero ahora chi" });
            });
          }
        });
      } else {
        res.json({ message: "Not Found" });
      }
    });
});
//Escuchar en el puerto indicado
app.listen(port, () => {
  console.log("Escuchando en puerto", port);
});
