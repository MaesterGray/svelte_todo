import { doc,collection,getDoc } from "firebase/firestore"
import { db } from "$lib/firebaseconfig"
import type { Project } from "$lib"

export async function load({params,locals}){
    const colRef = collection(db,'users',locals.userId,'completed')
     const docRef = doc(colRef,params.projectId)
    let project= await getDoc(docRef)
    return {projectId:project.id,projectData:project.data() ,userId:locals.userId} as {projectId:string,projectData:Project,userId:string}
}