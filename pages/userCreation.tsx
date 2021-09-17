// index.tsx
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import firebase from "../firebase/clientApp";
// Import the useAuthStateHook
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

export default function UserCreation() {

   // Destructure user, loading, and error out of the hook.
   const [user, loading, error] = useAuthState(firebase.auth());
   // console.log the current user and loading status
   console.log("Loading:", loading, "|", "Current user:", user);

  if (loading) {
    return <h6>Loading...</h6>;
  }

  if (error) {
    return null;
  }
  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        alignItems: "center",
        justifyContent: "center",
        
      }}
    >
        <h2>New User</h2>
      <h1>Welcome to the PiKapp Portal</h1>
     <div> </div>
    
      <div
      style={{
        maxWidth: "320px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <img
        style={{
          borderRadius: "50%",
          maxHeight: "48px",
          marginTop: "8px",
          marginRight: "8px",
        }}
        src={user.photoURL}
      />
      <div>
        <h4 style={{ marginBottom: 0 }}>{user.displayName}</h4>
        
      </div>
    </div>
      <h2>Information we have:</h2>
      <h4>Name: {user.displayName}</h4>
      <h4>Email: {user.email}</h4>
      <h4>Phone: {user.phoneNumber} (NOT ALWAYS WORKING)</h4>
      <h4>PhotoUrl: {user.photoURL}</h4>


      <h2>Information we need:</h2>
      <h2>(Form Here)</h2>

      
    </div>
  );
}
