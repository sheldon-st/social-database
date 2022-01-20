import Link from "next/link";
import Auth from "../../comps/Auth";
import PortalHome from "../../comps/PortalHome";

// index.tsx
import Head from "next/head";
import Image from "next/image";
import firebase from "../../firebase/firebase";
import db from "../../firebase/firestore";
// Import the useAuthStateHook
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useState , useEffect} from "react";

const Portal = () => {
  const [user, loading, error] = useAuthState(firebase.auth());

  const [userData, setUserData] = useState([])
  const getUserData = async () => {
    const doc = await db.collection("users").doc(user.uid).get()
    const newData = JSON.parse(JSON.stringify(doc.data()));
    setUserData(newData)
  }
  useEffect(() => {
    getUserData();
  }, []);

  if (loading) {
    return <h6>Loading...</h6>;
  }
  if (error) {
    return null;
  }

  return (
    <div>
      <Auth>
        <PortalHome userData={userData['userData']}/>
      </Auth>    
    </div>
  );
};

export default Portal;
