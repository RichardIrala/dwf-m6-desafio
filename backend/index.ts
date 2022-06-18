import "dotenv/config";
import * as express from "express";
import { db, rtdb } from "./db";
import { v4 as uuidv4 } from "uuid";
// import * as cors from "cors";

const app = express();
// const port = process.env.PORT;
app.use(express.json());
// app.use(cors());

const usersCollection = db.collection("milaneso");
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
  const { email } = req.body;
  usersCollection
    .where("email", "==", email)
    .get()
    .then((searchResponse) => {
      //si no existe el usuario hace esto
      if (searchResponse.empty) {
        res.status(404).json({ message: "Not found" });
      } else {
        res.json({
          id: searchResponse.docs[0].id,
        });
      }
    });
});

//crear una sala
app.post("/rooms", (req, res) => {
  const { userId } = req.body;
  usersCollection
    .doc(userId.toString())
    .get()
    .then((doc) => {
      if (doc.exists) {
        const roomRef = rtdb.ref("rooms/" + uuidv4());
        roomRef
          .set({
            messages: [],
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

//Con este post se envian mensajes a una sala específica
app.post("/rooms/:roomId", function (req, res) {
  const id = uuidv4();
  const fecha = Date.now();

  rtdb
    .ref("/rooms/" + req.params.roomId + "/" + id)
    .set({ msg: req.body.msg, user: req.body.user, date: fecha }, function () {
      res.json({ id, result: "mensaje enviado" });
    });

  console.log("Mensaje enviado");
});

//Escuchar en el puerto indicado
app.listen(process.env.PORT || 3000, () => {
  console.log("Escuchando en puerto", process.env.PORT || 3000);
});
