import { deleteDoc ,collection,doc} from "firebase/firestore";
import { db } from "$lib/firebaseconfig";
import { invalidate } from "$app/navigation";

export default async function deleteProject(projectType:'completed'|'ongoing',userId:string,projectId:string){
    const colRef = collection(db,'users',userId,projectType)
    const docRef = doc(colRef,projectId)

    await deleteDoc(docRef)
    try {
       await invalidate("app:home")
        //modal
    } catch (error) {
       console.error(error) 
       //modal
    }
}