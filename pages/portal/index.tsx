import Link from "next/link";
import Auth from "../../comps/Auth";
import PortalHome from "../../comps/PortalHome";

// index.tsx
import Head from "next/head";
import Image from "next/image";
import firebase from "../../firebase/firebase";
// Import the useAuthStateHook
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

const Portal = () => {
  const [user, loading, error] = useAuthState(firebase.auth());

  if (loading) {
    return <h6>Loading...</h6>;
  }
  if (error) {
    return null;
  }

  return (
    <div>
      <Auth>
        <PortalHome />
      </Auth>    
    </div>
  );
};

export default Portal;
