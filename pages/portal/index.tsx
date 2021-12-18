import Link from "next/link";
import Auth from "../../comps/Auth";
import PortalHome from "../../comps/PortalHome";

// index.tsx
import Head from "next/head";
import Image from "next/image";
import firebase from "../../firebase/clientApp";
// Import the useAuthStateHook
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

const Portal = () => {
  // Destructure user, loading, and error out of the hook.
  const [user, loading, error] = useAuthState(firebase.auth());
  // console.log("Loading:", loading, "|", "Current user:", user);

  // display while loading
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
