import * as admin from "firebase-admin";
const serviceAccount = JSON.parse(process.env.DB_KEY);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
  databaseURL: "https://apx-dwf-m6-86916-default-rtdb.firebaseio.com",
});

const db = admin.firestore();
const rtdb = admin.database();
export { db, rtdb };
