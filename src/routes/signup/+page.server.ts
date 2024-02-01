import { redirect } from '@sveltejs/kit';
import { createUserWithEmailAndPassword, } from 'firebase/auth';
import { auth,db } from '$lib';
import { setPersistence } from 'firebase/auth';
import { browserLocalPersistence } from 'firebase/auth';
import { collection, addDoc ,setDoc,doc } from "firebase/firestore"; 
import { completed } from '$lib/stores.js';



export const load = (async ({locals}) => {
  return {};
}) 

export const actions={
 
  signup:async({request})=>{
    let userCredential;
    const data = await request.formData()
   try {
    const persistence = await setPersistence(auth,browserLocalPersistence)
    userCredential = await createUserWithEmailAndPassword(auth,data.get('emailaddress'),data.get('password'))
    try {
      setDoc(doc(db,'users',`${userCredential.user.uid}`),{
        id:userCredential.user.uid,
        signInMethod:userCredential.user.providerData,
        uid:userCredential.user.uid,
        firstname:data.get('firstname'),
        lastname:data.get('lastname')
      })
    } catch (error) {
      console.log(error)
    }
   } catch (error) {
    console.log(error)
   } 
  
    if (userCredential) {
      redirect(303,`/${userCredential.user.uid}`)
    }
 
   
  },
};