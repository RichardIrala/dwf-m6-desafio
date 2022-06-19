import * as admin from "firebase-admin";
const serviceAccount = JSON.parse(process.env.DB_KEY);
const dbURL = process.env.DB_URL;
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
  databaseURL: dbURL,
});

const db = admin.firestore();
const rtdb = admin.database();
export { db, rtdb };
