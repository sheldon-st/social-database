import * as functions from "firebase-functions";

const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

export const createUserDocument = functions.auth.user().onCreate((user) => {
  db.collection("users")
    .doc(user.uid)
    .set(JSON.parse(JSON.stringify(user)));
});
<<<<<<< HEAD



=======
>>>>>>> added views for all members fetching from firestore
