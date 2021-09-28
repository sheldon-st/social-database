// components/Auth.tsx
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../firebase/clientApp";
// Import the useAuthStateHook
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import PortalHome from "./PortalHome";


const uiConfig = {
  // Redirect to / after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/portal",
  // We will display GitHub as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

function SignInScreen( { children }) {
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
        height: "100vh",
        width: "100vw",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gridGap: 8,
      }}
    >
      {loading && 
        <h4>Loading...</h4>
      }

      {!user && 
        <div style={{
          maxWidth: "320px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center", }} >
            <h1>Welcome to the Pi Kappa Phi member portal</h1>
            <h1>Description</h1>
            <p>Please sign-in:</p>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
      }

      {user && 
        <div>
          {children}
        </div>
      }
      
    </div>
    
  );
}

export default SignInScreen;