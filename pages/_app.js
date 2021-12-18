import Layout from "../comps/Layout";
import "../styles/globals.css";

import firebase from "../firebase/clientApp";
// Import the useAuthStateHook
import { useAuthState } from "react-firebase-hooks/auth";

function MyApp({ Component, pageProps }) {
  // Destructure user, loading, and error out of the hook.
  const [user, loading, error] = useAuthState(firebase.auth());
  // console.log the current user and loading status
  // console.log("Loading:", loading, "|", "Current user:", user);

  if (loading) {
    return <h6>Loading...</h6>;
  }

  if (error) {
    return null;
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
