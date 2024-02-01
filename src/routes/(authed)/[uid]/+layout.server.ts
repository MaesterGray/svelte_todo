import { collection,getDocs, } from "firebase/firestore";
import type { PageServerLoad } from "./new-project/$types.js"; 
import { db } from "$lib";

export const load = async ({params,depends}) => {
  depends('app:random')
  let userDb ;

const colRef = collection(db,'users')
const snapshot = await getDocs(colRef);
try {
  userDb = snapshot.docs.find((doc) => {
          
    return doc.data().id === params.uid;
  })

  if (userDb) {
    return{
      userDb:userDb.data(),
      dbid:userDb.id
    }
  }

} catch (error) {
  return {
    error
  }
}
      
}
