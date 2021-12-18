import * as functions from "firebase-functions";

const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

const authUserCollectionName = "users"
const userDataCollectionName = "userData"

// The auth db that firebase uses is only for auth so 
// we create a new collection for custom user data
export const createUserDocument = functions.auth.user().onCreate((user) => {
  return db.collection(authUserCollectionName).doc(user.uid).set(JSON.parse(JSON.stringify(user))).then(console.log("userAdded"))
  const userData = {
    ...user,
    hasCompletedForm: false,
    // CUSTOM USER DATA FIELDS HERE (PRE-FORM)
  }
  console.log("here?")
  return db.collection(userDataCollectionName).doc(user.uid).set(JSON.parse(JSON.stringify(userData))).then(console.log("bottom bby"))
});
