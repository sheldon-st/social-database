// components/Auth.tsx
import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../firebase/firebase";
// Import the useAuthStateHook
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

const uiConfig = {
  signInSuccessUrl: "/portal",
  signInFlow: 'popup',
  // We will display GitHub as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

function SignInScreen( { children }) {
  const [user, loading, error] = useAuthState(firebase.auth());
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
  // console.log the current user and loading status
  // console.log("Loading:", loading, "|", "Current user:", user);

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

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