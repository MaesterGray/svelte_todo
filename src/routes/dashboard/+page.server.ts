import {
    getDocs,
    doc,
    collection,
  } from "firebase/firestore";
  import { db } from "$lib/firebaseconfig";
  
  export async function load({ params, depends ,locals}) {
    console.log({user:locals.userId})
    depends("app:home");
    let returnObject={
      ongoing:[],
      completed:[]
    }
    let completedColRef = collection(db, "users", locals.userId, "completed");
    let ongoingColRef = collection(db, "users", locals.userId, "ongoing");
    let completedProjects =  getDocs(completedColRef);
    let ongoingProjects =  getDocs(ongoingColRef);
    let someRandomValue= await Promise.all([
      completedProjects,
      ongoingProjects,
    ])
  
    try {
  
      someRandomValue[1].forEach((doc)=> returnObject.ongoing.push({id:doc.id,
        ...doc.data()}))
    } catch (error) {
      console.error(error)
    }
  
    return {
      returnObject: returnObject,
    };
  }