// index.tsx
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import firebase from "../firebase/clientApp";
import Auth from "../components/auth";
import VoterList from "../components/voterList";


// Import the useAuthStateHook
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

export default function Home() {
  const db = firebase.firestore();
  type VoteDocument = {
    vote: string;
  };

  // index.tsx 
 const addVoteDocument = async (vote: string) => {
  await db.collection("votes").doc(user.uid).set({
    vote,
  });
};

  // Destructure user, loading, and error out of the hook.
  const [user, loading, error] = useAuthState(firebase.auth());
  // console.log the current user and loading status
  console.log("Loading:", loading, "|", "Current user:", user);

  const [votes, votesLoading, votesError] = useCollection(
    firebase.firestore().collection("votes"),
    {}
  );

  if (!votesLoading && votes) {
    votes.docs.map((doc) => console.log(doc.data()));
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
        background:
          "linear-gradient(180deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
      }}
    >
      {loading && <h4>Loading...</h4>}
      {!user && <Auth />}
      {user && (
        <>
          <h1>Pineapple on Pizza?</h1>

          <div style={{ flexDirection: "row", display: "flex" }}>
            <button
              style={{ fontSize: 32, marginRight: 8 }}
              onClick={() => addVoteDocument("yes")}
            >
              ✔️🍍🍕
            </button>
            <h3>
              Pineapple Lovers:{" "}
              {
                votes?.docs?.filter(
                  (doc) => (doc.data() as VoteDocument).vote === "yes"
                ).length
              }
            </h3>
          </div>
          <div style={{ flexDirection: "row", display: "flex" }}>
            <button
              style={{ fontSize: 32, marginRight: 8 }}
              onClick={() => addVoteDocument("no")}
            >
              ❌🍍🍕
            </button>
            <h3>
              Pineapple Haters:{" "}
              {
                votes?.docs?.filter(
                  (doc) => (doc.data() as VoteDocument).vote === "no"
                ).length
              }
            </h3>
          </div>
        </>
      )}
      <div style={{ marginTop: "64px" }}>
            <h3>Members:</h3>
            <div
              style={{
                maxHeight: "320px",
                overflowY: "auto",
                width: "240px",
              }}
            >
              {votes?.docs?.map((doc) => (
                <>
                  <VoterList id={doc.id} key={doc.id} vote={doc.data().vote} />
                </>
              ))}
            </div>
          </div>
    </div>

  );
}
