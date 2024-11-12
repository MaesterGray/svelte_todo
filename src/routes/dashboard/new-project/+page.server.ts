// import type { PageServerLoad } from './$types';
import {doc,addDoc,collection} from 'firebase/firestore'
import { db } from '$lib/firebaseconfig.js'
import { redirect } from '@sveltejs/kit'


export const actions ={
	createProject:async({locals,request})=>{
		const formdata = Object.fromEntries(await request.formData()) 
		let title = formdata.title as string
		let tasks = []
		for (let index = 0; index < Number(formdata.numberOfTasks); index++) {
			tasks.push({name:formdata[`${index}`],done:false})
		}
		const colRef = collection(db,'users',locals.userId,'ongoing')
    await addDoc(colRef,{title,description:formdata.description,dueDate:formdata['due-date'],tasks})    
    try{
		
		redirect(300,'/')
     }catch(err){
         console.error(err)
     }
   }
	}
