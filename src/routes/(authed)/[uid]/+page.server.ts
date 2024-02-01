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
  let completedColRef = collection(db, "users", params.uid, "completed");
  let ongoingColRef = collection(db, "users", params.uid, "ongoing");
  let completedProjects = await getDocs(completedColRef);
  let ongoingProjects = await getDocs(ongoingColRef);
  let returnObject = await Promise.all([
    completedProjects,
    ongoingProjects,
  ]).then((values) => {
    let tempArray = [];
    values[1].forEach((doc) => {
      ongoing.push(doc.data());
    });
    
    values[0].forEach((doc) => {
      console.log(doc.data());
        completed = doc.data()
    });

    return {
      completed: completed,
      ongoing: ongoing,
    };
  });
  return {
    returnObject: returnObject,
  };
}
