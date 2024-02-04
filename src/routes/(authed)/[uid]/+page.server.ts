import {
  getDocs,
  doc,
  collection,
  type DocumentData,
} from "firebase/firestore";
import { db } from "$lib";
import { DocumentSnapshot } from "firebase/firestore";

export async function load({ params, depends }) {
  depends("app:home");
  let completed: DocumentData[] = [];
  let ongoing: DocumentData[] = [];
  let returnObject:{
    ongoing:DocumentData[],
    completed:DocumentData[]}={
    ongoing:[],
    completed:[]
  }
  let completedColRef = collection(db, "users", params.uid, "completed");
  let ongoingColRef = collection(db, "users", params.uid, "ongoing");
  let completedProjects =  getDocs(completedColRef);
  let ongoingProjects =  getDocs(ongoingColRef);
  let someRandomValue= await Promise.all([
    completedProjects,
    ongoingProjects,
  ])

  try {

    someRandomValue[1].forEach((doc)=> returnObject.ongoing.push(doc.data()))
  } catch (error) {
    console.error(error)
  }

  return {
    returnObject: returnObject,
  };
}
