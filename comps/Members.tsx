// members.tsx
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import firebase from "../firebase/firebase";
import db from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

export default function MembersPanel({ users }) {
  // Destructure user, loading, and error out of the hook.
  const [user, loading, error] = useAuthState(firebase.auth());

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
        alignItems: "left",
        justifyContent: "left",
        backgroundColor: "lightblue",
      }}
    >
      <h2>Current Members</h2>
      {users &&
        users.map((user) => {
          console.log(user)
          return (
            <div className="userDisplayRow">
              <h4 key={user}>
                {user.displayName} -- {user.email} -- {user.userData && user.userData.phoneNumber} -- {user.userData && user.userData.major} -- {user.userData && user.userData.previousEmployers} -- {user.userData && user.userData.onCampus}
              </h4>
            </div>
          );
        })}
    </div>
  );
}
