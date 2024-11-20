import {doc,addDoc,collection} from 'firebase/firestore'
import { invalidate } from '$app/navigation'
import { db } from '$lib/firebaseconfig.js'
import { fail, redirect } from '@sveltejs/kit'
import type { Action } from '@sveltejs/kit'

export const actions ={
	createProject:async({locals,request})=>{
		const formdata = Object.fromEntries(await request.formData()) 
		let title = formdata.title as string
		let tasks = []
		for (let index = 0; index < Number(formdata.numberOfTasks); index++) {
			tasks.push({name:formdata[`${index}`],done:false})
		}
		const colRef = collection(db,'users',locals.userId,'ongoing')
   	let result= await addDoc(colRef,{title,description:formdata.description,dueDate:formdata['due-date'],tasks}) 
	let newProjectId;
    try{
		newProjectId = result.id
     }catch(err){
		const errorMessage = (err as Error).message;
		console.error(err)
		return fail(400,{createProjectError:errorMessage})
     }
	return redirect(301,`/dashboard/project/ongoing/${newProjectId}`)
   }
	}
