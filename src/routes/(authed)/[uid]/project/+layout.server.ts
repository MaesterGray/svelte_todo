import { getDoc,doc } from "firebase/firestore";
import { Project, db } from "$lib";
export const load = async ({url,params}) => {
  let project;
  let projectRef;
if (url.pathname.includes('completed')) {
   projectRef = doc(db,'users',params.uid,'completed',`${params.title}`)
  project = await getDoc(projectRef).then((doc)=>{
    return doc.data()
  }
  )
   
}else{
  projectRef = doc(db,'users',params.uid,'ongoing',`${params.title}`)
  project = await getDoc(projectRef).then((doc)=>{

    return doc.data()
  }).catch((err)=>{
    console.error(err)
  })

}
  return {
    project:project
  };
} ;
