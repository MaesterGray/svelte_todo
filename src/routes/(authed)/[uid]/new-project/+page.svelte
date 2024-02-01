<script lang="ts">
    import type { PageData } from './$types';
    import type { Task } from '$lib';
    import Icon from '@iconify/svelte';
    import { flip } from 'svelte/animate';
    import { db } from '$lib';
    import {invalidate} from '$app/navigation'
    import { setDoc,doc,getDocs,collection,arrayUnion,updateDoc,addDoc } from 'firebase/firestore';
    import { mutationOccured } from '$lib/stores.js';
    import { goto } from '$app/navigation';
    import toast, { Toaster } from 'svelte-french-toast';
    import { Project } from '$lib';
    import { page } from '$app/stores';
    import Circleprogress from '$lib/components/circleprogress.svelte';
    import{ dateFormatter} from '$lib/utils'
    export let data: PageData;
    let title =''
    let description =''
    let tasks:Task[]=[
   ]
   let duedate =''
   let reminder =''
   let date = new Date()
   let year = date.getFullYear()
   let month = date.getMonth()+1
   let day = date.getDate()
   let presenthour = date.getHours()
   let presentMinute = date.getMinutes()


   async function handleCreate() {
    const docRef = doc(db,'users',$page.params.uid,'ongoing',title)
    await setDoc(docRef,new Project(false,tasks,description,title,reminder,duedate).toFirestore())    
    try{
        toast.success('Project created succesfully')
        invalidate('app:home').then(()=>{
            goto(`/${data.userUid}/project/ongoing/${title}`,{
                replaceState:true
            })
        })

    }catch(err){
        toast.error('Try again later')
        console.error(err)
    }
   }
  console.log(data.userDb) 
</script>


<div class=" w-screen h-[92vh] flex flex-col items-center space-y-2 bg-gray-800 ">
    <h1 class=" w-[90%] text-center text-white font-Inter leading-7">
       <button on:click={()=>history.back()}> <Icon icon="material-symbols-light:arrow-back" /></button>
        Create New Project
    </h1>

    <form class=" flex flex-col space-y-4 font-Inter leading-7 font-semibold w-[90%] " >

        <label class="  flex flex-col text-white" for="title" >
            Project Title
            <input class="bg-slate-600 outline-none p-2 font-light" name="title" bind:value={title}/>
        </label>
        
        <label class="  flex flex-col text-white" for="description">
            Project Description
            <textarea class="bg-slate-600 resize-none outline-none p-2 font-light" name="description" bind:value={description}/>
        </label>

        <label class="  flex flex-col text-white" for="due-date">
            Due Date
            <input type="date" class="bg-slate-600 resize-none outline-none p-2 font-light" name="due-date" bind:value={duedate} min={dateFormatter(year,month,day)} />
        </label>
  
        <label class="  flex flex-col text-white" for="reminder">
            Set a reminder
            <input type='datetime-local'  class="bg-slate-600 resize-none outline-none p-2 font-light" name="reminder" bind:value={reminder} min={`${dateFormatter(year,month,day)}T${presenthour}:${presentMinute}`} />
        </label>
        <button class="  border border-black bg-orange-300" on:click={()=>{tasks = [...tasks,{isComplete:false,name:'',index:tasks.length}]}}>Add Task</button>
            <div>
            {#each tasks as {index,name}(index)}
                <div class=" relative w-full h-[5vh] mb-11"
                animate:flip={{duration:200}}>
                    <input required type="text" class=" w-full  bg-slate-600 p-2 outline-none text-white font-light" bind:value={name}/>
                    <div class=" absolute bottom-[-90%] right-[4%] text-white bg-opacity-25 flex space-x-2 flex-row-reverse">
                        <button on:click={()=>tasks=tasks.filter((task)=>(task.index!==index))} class=" h-[40px] w-[40px] rounded-full flex items-center justify-center bg-slate-900"><Icon icon="ic:baseline-delete" /></button>
                        <button on:click={()=>{tasks =[...tasks,{isComplete:false,name:'',index:tasks.length}]}} class=" h-[40px] w-[40px] rounded-full flex items-center justify-center bg-slate-900"><Icon icon="basil:add-solid" /></button>
                    </div>
                </div>
            {/each}
        </div>

            <button class=" bg-orange-300 text-center " type="submit"  on:click={handleCreate} class:hidden={tasks.length===0}>Create Project</button>
    </form>
    <Toaster/>
</div>


<style>
    .hidden{
    display: none;
    }
</style>