import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { redirect } from "@sveltejs/kit";
import { getFirestore } from "firebase/firestore";
import { collection,  } from "firebase/firestore"; 
import { firebaseConfig } from "$lib";
import { app } from "$lib";
import { auth } from "$lib";

export async function load({}) {
  let user = auth.currentUser;
  if (user) {
    
  } else {
    redirect(303, '/');
  }

  return { 
    userUid:user.uid,
    
   };
}



