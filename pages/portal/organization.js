import Link from "next/link";
import Auth from "../../comps/Auth";
import PortalHome from "../../comps/PortalHome";

// index.tsx
import firebase from "../../firebase/clientApp";
// Import the useAuthStateHook
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

const Portal = () => {
  // Destructure user, loading, and error out of the hook.
  const [user, loading, error] = useAuthState(firebase.auth());
  // console.log the current user and loading status

  // display while loading
  if (loading) {
    return <h6>Loading...</h6>;
  }

  // handle error
  if (error) {
    return null;
  }

  return (
    <div>
      <p>this is the organization home</p>
    </div>
  );
};

export default Portal;
