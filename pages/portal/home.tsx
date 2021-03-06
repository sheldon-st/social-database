// members.tsx
import Head from "next/head";
import Image from "next/image";
import Auth from "../../comps/Auth";
import styles from "../styles/Home.module.css";
import firebase from "../../firebase/firebase";
import Link from "next/link";
import MembersPanel from "../../comps/Members";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useEffect, useState } from "react";
import db from "../../firebase/firestore";


export default function Members() {
  // Destructure user, loading, and error out of the hook.
  const [user, loading, error] = useAuthState(firebase.auth());

  if (loading) {
    return <h6>Loading...</h6>;
  }
  if (error) {
    return null;
  }

  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    const response = db.collection("users");
    const data = await response.get();
    const saveUsers = []
    data.docs.forEach((user) => {
      saveUsers.push(user.data())
    });
    setUsers(saveUsers);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <Auth >
        <h1>Home</h1>
        <MembersPanel users={users}/>
      </Auth>
    </div>
  );
};
