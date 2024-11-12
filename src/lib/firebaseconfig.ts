import { getApp,getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBNoZpl8cbZYl8Vr_zeNtwjlvw5PdB3-aY",
    authDomain: "svelte-todo-38b7c.firebaseapp.com",
    projectId: "svelte-todo-38b7c",
    storageBucket: "svelte-todo-38b7c.appspot.com",
    messagingSenderId: "847348257887",
    appId: "1:847348257887:web:12a52489e6a37f9e6637ea"
  };

const app = getApps().length ? getApp() : initializeApp(firebaseConfig); 
const auth = getAuth();
const db = getFirestore(app);

export {auth,db}