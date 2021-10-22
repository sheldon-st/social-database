// index.tsx
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import firebase from "../firebase/clientApp";
import Link from "next/link";
// Import the useAuthStateHook
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useState } from "react";
import React from "react";

import { useDocument } from "react-firebase-hooks/firestore";
import { exit } from "process";


export default function PortalHome( ) {

  const handleSubmit= (e) => {
    e.preventDefault();
    // ???
  }

  const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [phoneNumber, setPhoneNumber] = useState('');





  const [authUser, userLoading, userError] = useAuthState(firebase.auth());
  // console.log the current user and loading status
  console.log("Loading:", userLoading, "|", "Current user:", authUser);

  if (userLoading) {
    return <h6>Loading...</h6>;
  }

  if (userError) {
    return null;
  }



  const [user, loading, error] = useDocument(
    firebase.firestore().doc('users/' + authUser.uid),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }

  );





  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        alignItems: "left",
        justifyContent: "left",
        backgroundColor: "lightblue"
        
      }}
    >
         <h1>Welcome to the Portal! This is the home page for now </h1>
            <p>You are signed in</p>
            <p>This information is being fetched from a firestore database</p>
            
            <p>user with name, email, photo and if availbe phone number is automatically created in firestore on google auth sign in</p>
            <p>this is handled in functions/ src</p>

      <div
      style={{
        maxWidth: "320px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
     {/*  <img
        style={{
          borderRadius: "50%",
          maxHeight: "48px",
          marginTop: "8px",
          marginRight: "8px",
        }}
        src={user.photoURL}
      /> */}
      {/* <div>
        <h4 style={{ marginBottom: 0 }}>{user.displayName}</h4>
        
      </div>
    </div>
      <h2>Information we have:</h2>
      <h4>Name: {user.displayName}</h4>
      <h4>Email: {user.email}</h4>
      <h4>Phone: {user.phoneNumber} (NOT ALWAYS WORKING)</h4>
      <h4>PhotoUrl: {user.photoURL}</h4> */}
</div>
      <h2>Information we need:</h2>
      <h2>(Form Here)</h2>

      <div>
      <div>
      <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Document: Loading...</span>}
        {user && <span>
          Document: {user.data().displayName}
          <form onSubmit={e => {handleSubmit(e)}}>
        <label>Name</label>
        <br />
        <input 
          name='name' 
          type='text'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <br/>
        <label>Email</label>
        <br />
        <input 
          name='userEmail' 
          type='text' 
        />
        <br />
        <label>Phone Number</label>
        <br />
        <input
          name='pn' 
          type='text'
        />
        <br/>
        <input 
          className='submitButton'
          type='submit' 
          value='Log Chore' 
        />
      </form>


    
          </span>}
      </p>
    </div>
    </div>

      <Link  href="/portal/members">
          GO TO MEMBERS DIRECTORY
        </Link>
      <Link  href="/portal/organization">
          GO TO ORGANIZATION HOME
        </Link>

    </div>
  );


}
