import { db } from "$lib/firebaseconfig";
import { doc,collection,setDoc,addDoc,deleteDoc } from "firebase/firestore";
import type { Project } from "$lib";
    import { invalidateAll} from "$app/navigation";
    import { goto } from "$app/navigation";
export default async function updateProject(userId:string,projectId:string,previousState:'ongoing'|'completed',isComplete:boolean,projectBody:Project){
    if (previousState==='ongoing'&& isComplete===false) {
        const colRef = collection(db,'users',userId,'ongoing')
        const docRef = doc(colRef,projectId)
      await setDoc(docRef,projectBody)
      try{
        invalidateAll()

        //pop a toast that says project updated succesfully
      }catch(err){
        //pop a toast that says project failed to update

      }
    }else if(previousState==='ongoing'&& isComplete===true){
        const colRef = collection(db,'users',userId,'ongoing')
        const docRef = doc(colRef,projectId)
        await deleteDoc(docRef)
        try {
            const colRef = collection(db,'users',userId,'completed')
            const docRef = doc(colRef,projectId)
            await setDoc(docRef,projectBody)
            invalidateAll()
            goto(`/dashboard/project/completed/${projectId}`)
        //pop a toast that says project updated succesfully

        } catch (error) {
        //pop a toast that says project failed to update
            
        }
    }else if(previousState==='completed'&& isComplete===true){
        const colRef = collection(db,'users',userId,'completed')
        const docRef = doc(colRef,projectId)
      await setDoc(docRef,projectBody)
      try{
        invalidateAll()

        //pop a toast that says project updated succesfully
      }catch(err){
        //pop a toast that says project failed to update

      }
    }else{
        const colRef = collection(db,'users',userId,'completed')
        const docRef = doc(colRef,projectId)
        await deleteDoc(docRef)

        try {
          const colRef = collection(db,'users',userId,'ongoing')
          const docRef = doc(colRef,projectId)
          await setDoc(docRef,projectBody)
          invalidateAll()

          goto(`/dashboard/project/ongoing/${projectId}`)

        //pop a toast that says project updated succesfully

        } catch (error) {
        //pop a toast that says project failed to update
            
        }
    }
}
