import { signInWithEmailAndPassword,getAuth } from "firebase/auth"
import { error, redirect } from '@sveltejs/kit';
import { auth,db } from '$lib';

 export const actions={
    login:async ({request})=>{
        let userCredential;
        const formdata = await request.formData()
        try {
            userCredential = await signInWithEmailAndPassword(auth,formdata.get('emailaddress'),formdata.get('password'))
        } catch (error) {
            console.log(error)
            return{
                error:error.code}
        } if (userCredential) {
            throw redirect(303,`/${userCredential.user.uid}`)
        }
       
    }  
}