// index.tsx
import Link from "next/link";
import { useRouter } from 'next/router'
import styles from "../styles/Home.module.css";
import firebase from "../firebase/firebase";
import db from "../firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import React from "react";

import InfoForm from "../comps/InfoForm"

export default function PortalHome({ userData }) {

  console.log("---" + userData)
  const router = useRouter()
  const [user, loading, error] = useAuthState(firebase.auth());
  // console.log("Loading:", userLoading, "|", "Current user:", authUser);

  if (loading) {
    return <h6>Loading...</h6>;
  }
  if (error) {
    return null;
  }

  // update user data based on form info
  const handleSubmit = async (e) => {
    e.preventDefault();
    var form = {};
    for (var i = 0; i < e.target.length; i++) {
      var item = e.target[i];
      form[item.name] = item.value;
    }
    // build new user object
    let newUserData = {
      displayName: form['displayName'],
      email: form['email'],
      phoneNumber: form['pn'],
      major: form['major'],
      onCampus: form['onCampus'],
      previousEmployers: form['previousEmployers']
    }

    let newUser = JSON.parse(JSON.stringify(user));
    newUser.userData = newUserData

    await db.collection("users").doc(user.uid)
      .set(JSON.parse(JSON.stringify(newUser)))
      .then();
  };

  const logOut = async (e) => {
    e.preventDefault();
    await firebase.auth().signOut().then(() => {
      router.reload()
    }).catch((error) => {
      console.log(error)
    });
  };

  return (
    <div>
      {/* {user.exists && ( */}
      <div className={styles.portalHomeContainer}>
        <h1>Welcome to the Portal! This is the home page for now </h1>
        <p>You are signed in</p>
        <p>This information is being fetched from a firestore database</p>
        <p>
          A user with name, email, photo and phone number (optional) is
          automatically created in firestore on google auth sign in
        </p>
        <p>this is handled in functions/ src</p>

        <div
          style={{
            maxWidth: "320px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}></div>

        <h2>Your Info</h2>
        < InfoForm data={""} />
        <div>
          <p>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <span>Document: Loading...</span>}
            {user && (
              <span>
                {userData &&
                  <form
                    onSubmit={(e) => {
                      handleSubmit(e);
                    }}>
                    <label>Name</label>
                    <br />
                    <input
                      name="name"
                      type="text"
                      value={user.displayName}
                    />
                    <br />
                    <label>Email</label>
                    <br />
                    <input name="email" type="text" value={user.email} />
                    <br />
                    <label>Phone Number</label>
                    <br />
                    <input name="pn" type="text" value={userData.phoneNumber} />
                    <br />
                    <label>Major / Minor</label>
                    <br />
                    <input name="major" type="text" value={userData.major} />
                    <br />
                    <label>Are you currently on campus or in Boston?</label>
                    <br />
                    <input name="onCampus" type="bool" value={userData.onCampus} />
                    <br />
                    <label>Please list any previous companies where you have worked (internship, co-op, full time)</label>
                    <br />
                    <input name="previousEmployers" type="text" value={userData.previousEmployers} />
                    <br />
                    <br />
                    <input
                      className="submitButton"
                      type="submit"
                      value="Submit"
                    />
                  </form>
                }
              </span>
            )}
          </p>
        </div>

        <Link href="/portal/home">GO TO ORGANIZATION HOME</Link>

        {user && <button onClick={logOut}>LOG OUT</button>}

      </div>
    </div>

  );
}
