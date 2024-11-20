import {
    getDocs,
    collection,
    
  } from "firebase/firestore";
  import { db } from "$lib/firebaseconfig";
  
  import type { Project } from "$lib";
  export async function load({  depends ,locals}) {
    depends("app:home");
    let returnObject={
      ongoing:[],
      completed:[],
      userId:locals.userId,
      profilePic:locals.profilePic

    } as {
      ongoing:{id:string,data:Project}[]
      completed:{id:string,data:Project}[]
      userId:string
      profilePic:string
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
      someRandomValue[0].forEach((doc)=> returnObject.completed.push({id:doc.id,data:doc.data()}))
      someRandomValue[1].forEach((doc)=> returnObject.ongoing.push({id:doc.id,data:doc.data()}))
    } catch (error) {
      console.error(error)
    }
  
    return {
      returnObject: returnObject,
    };
  }