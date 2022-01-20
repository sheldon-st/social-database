import * as functions from "firebase-functions";

const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

let userDataFields = {
  displayName: "",
  phoneNumber: 0,
  major: "",
  onCampus: true,
  previousEmployers: "",
}

export const createUserDocument = functions.auth.user().onCreate((user) => {
  const userData = JSON.parse(JSON.stringify(user));
  userData.userData = userDataFields
  db.collection("users")
    .doc(user.uid)
    .set(JSON.parse(JSON.stringify(userData)));
});
