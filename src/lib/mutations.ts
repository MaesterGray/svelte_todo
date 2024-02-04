import toast from "svelte-french-toast";
import { addDoc,doc,deleteDoc,setDoc } from "firebase/firestore";
import { progressCalc } from "./utils";
import { db } from "$lib";
import { Project } from "$lib";
import { invalidate } from "$app/navigation";

export function handleUpdate(project,copyProject,useruid){
    if(window.location.href.includes('completed')){
        if (progressCalc(copyProject.tasks)===100) {
            if (project.title===copyProject.title) {
                toast.promise(
                    setDoc(doc(db,'users',useruid,'completed',project.title),new Project(true,copyProject.tasks,copyProject.description,copyProject.title,copyProject.reminder,copyProject.duedate).toFirestore()).then(()=>{
                        invalidate('app:home')
                    }),{
                    loading:'loading',
                    success:'Project updated succesfully',
                    error:'Something went wrong'
                })
            }else{
               let mutation1= deleteDoc(doc(db,'users',useruid,'completed',project.title))
               let mutation2 = setDoc(doc(db,'users',useruid,'completed',copyProject.title),new Project(true,copyProject.tasks,copyProject.description,copyProject.title,copyProject.reminder,copyProject.duedate).toFirestore())

             toast.promise(Promise.all([mutation1,mutation2]).then(()=>{
                invalidate('app:home')
             }),{
                loading:'loading',
                success:'Project updated succesfully',
                error:'Something went wrong'
             })  
            }
        }else{
            let mutation1= deleteDoc(doc(db,'users',useruid,'completed',project.title))
            let mutation2= setDoc(doc(db,'users',useruid,'ongoing',project.title),new Project(false,copyProject.tasks,copyProject.description,copyProject.title,copyProject.reminder,copyProject.duedate).toFirestore())

            toast.promise(Promise.all([mutation1,mutation2]).then(()=>{
                invalidate('app:home')
            }),{
                loading:'loading',
                success:'Project updated succesfully',
                error:'Something went wrong'
            })
        }
    }else{
        if (progressCalc(copyProject.tasks)===100) {
                let mutation1= deleteDoc(doc(db,'users',useruid,'ongoing',project.title))
                let mutation2 = setDoc(doc(db,'users',useruid,'completed',copyProject.title),new Project(true,copyProject.tasks,copyProject.description,copyProject.title,copyProject.reminder,copyProject.duedate).toFirestore())
                toast.promise(
                    Promise.all([mutation1,mutation2]).then(()=>{
                        invalidate('app:home')
                    }),{
                    loading:'loading',
                    success:'Project completed',
                    error:'Something went wrong'
                })
               
        }else{
            if (project.title!== copyProject.title) {
                let mutation1= deleteDoc(doc(db,'users',useruid,'ongoing',project.title))
                let mutation2= setDoc(doc(db,'users',useruid,'ongoing',copyProject.title),new Project(false,copyProject.tasks,copyProject.description,copyProject.title,copyProject.reminder,copyProject.duedate).toFirestore())
                console.log('module 1')
            toast.promise(Promise.all([mutation1,mutation2]).then(()=>{
                invalidate('app:home')
            }),{
                loading:'loading',
                success:'Project updated succesfully',
                error:'Something went wrong'
            })
            }else{
                console.log('module 2')
                toast.promise(setDoc(doc(db,'users',useruid,'ongoing',copyProject.title),new Project(false,copyProject.tasks,copyProject.description,copyProject.title,copyProject.reminder,copyProject.duedate).toFirestore()).then(()=>{
                    invalidate('app:home')
                }),{
                    loading:'loading',
                    success:'Project updated succesfully',
                    error:'Something went wrong'
                })
            }
            
        } 
    }
}

export function deleteProject(type:'ongoing'|'completed',useruid:string,title:string){
    if (type==='completed') {
      toast.promise(deleteDoc(doc(db,'users',useruid,'completed',title)).then(()=>{invalidate('app:home')}),{
        success:'Project deleted succesfully',
        loading:'loading',
        error:'Action failed, try again later'
      })  

    }else{
        toast.promise(deleteDoc(doc(db,'users',useruid,'ongoing',title)).then(()=>{invalidate('app:home')}),{
            success:'Project deleted sucessfully',
            loading:'Loading',
            error:'Action failed try again later'
        })
    }
}