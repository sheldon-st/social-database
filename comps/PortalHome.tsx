// index.tsx
import Link from "next/link";
import { useRouter } from 'next/router'
import styles from "../styles/Home.module.css";
import firebase from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useState } from "react";
import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { exit } from "process";

import InfoForm from "../comps/InfoForm"

export default function PortalHome() {

  const router = useRouter()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [user, loading, error] = useAuthState(firebase.auth());
  // console.log("Loading:", userLoading, "|", "Current user:", authUser);

  if (loading) {
    return <h6>Loading...</h6>;
  }
  if (error) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // ???
  };
  const logOut = async (e) => {
    e.preventDefault();
    await firebase.auth().signOut().then(() => {
      router.reload()
    }).catch((error) => {
      console.log(error)
    });
  };

  // const [user, loading, error] = useDocument(
  //   firebase.firestore().doc("userData/" + authUser.uid),
  //   { snapshotListenOptions: { includeMetadataChanges: true } },
  // );

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

        <h2>Information we need:</h2>
        < InfoForm data={""} />

        {/* TODO: need a concept of completed/not completed. form should display current data with the option to edit */}

          <div>
            <p>
              {error && <strong>Error: {JSON.stringify(error)}</strong>}
              {loading && <span>Document: Loading...</span>}
              {user && (
                <span>
                  Document: {user.displayName}
                  <form
                    onSubmit={(e) => {
                      handleSubmit(e);
                    }}>
                    <label>Name</label>
                    <br />
                    <input
                      name="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <br />
                    <label>Email</label>
                    <br />
                    <input name="userEmail" type="text" />
                    <br />
                    <label>Phone Number</label>
                    <br />
                    <input name="pn" type="text" />
                    <br />
                    <input
                      className="submitButton"
                      type="submit"
                      value="Log Chore"
                    />
                  </form>
                </span>
              )}
            </p>
          </div>

        <Link href="/portal/members">GO TO MEMBERS DIRECTORY</Link>
        <Link href="/portal/home">GO TO ORGANIZATION HOME</Link>

        {user && <button onClick={logOut}>LOG OUT</button> }

      </div>
    </div>

  );
}
