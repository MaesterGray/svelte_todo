<script lang="ts">
import type { PageData } from './$types.js';
import Completedtask from '$lib/components/completedtask.svelte';
import Ongoingproject from '$lib/components/ongoingproject.svelte';
import { fade } from 'svelte/transition';
import workman from '$lib/assets/workingman_svelte_todo.jpeg';
import { invalidate } from '$app/navigation';
import toast,{Toaster} from 'svelte-french-toast'
import { mutationOccured } from '$lib/stores.js';
import type {ComponentEvents} from 'svelte'
import type { LayoutData } from '../$types.js';
import {deleteProject} from '$lib/mutations.js'
import {onMount} from 'svelte'
import { getToken,getMessaging } from 'firebase/messaging';
  import { app } from '$lib';
  export let layout:LayoutData;
  export let data:PageData


onMount(()=>{
       
        setTimeout(()=>{
        const message = getMessaging(app)
            getToken(message,{vapidKey:'BCBzutOBCTTC3CdWIOWHRZf5G9eq9gjbd_SXc9aFwaG2pnlwrGymhUKvaplA8T9qrVt8NwQZ6kZXBK4FNK9D-jo'})
            if ("Notification" in window&& Notification.permission==='default') {
            Notification.requestPermission().then((permission)=>{
                if (permission==='granted') {
                    new Notification('Welcome to Daytask')
                }else{
                    toast('You will not be able to receive notifications when your projects and tasks have reached their due-date')
                }
            })
        }else{

        }
        },4000)
    }) 
</script>

<div transition:fade class=" w-screen h-[92vh] bg-gray-800 flex flex-col items-center space-y-2 pt-3 overflow-y-scroll pb-3">

    <h1 class=" w-[90%] flex  h-[8vh] items-center justify-between">

        <div class=" flex flex-col">
            <small class=" text-orange-300">{'Welcome '}</small>
        <span class=" font-Square font-semibold text-lg text-white capitalize"> {data?.userDb?.lastname} {data?.userDb?.firstname}</span>
        </div>
        
        <a href={`/$ layout.userUid}/profile`} class=" w-[7vh] h-[7vh] rounded-md">
            <img src={workman} class=" object-fill rounded-full w-full h-full" alt=""/>
        </a>

    </h1>

    <div class=" flex space-x-2 w-[90%]">
        <input class=" w-[90%] bg-slate-600 text-slate-500" type="search"  placeholder="Search tasks"/>
        <div></div>
    </div>

    <div class=" flex flex-col space-y-3 w-[90%] flex-shrink-0">
        <h1 class=" w-full text-start text-white font-semibold">Completed Projects</h1>
        <div class=" h-[20vh] overflow-x-scroll flex space-x-3 w-[90vw] text-white font-semibold text-xl items-center ">
                {#if data.returnObject.completed.length>0}
                {#each layout?.userDb?.projects.completed as project,i}
                <Completedtask  title={project.title} description={project.description} position={i} route={`/$ layout.userUid}/${project.title}`} tasks={project.tasks}/>
            {/each}    
                    {:else} 
                    You do not have any completed projects
                {/if}
                
        </div>
    </div>

    <div class=" flex flex-col space-y-3 w-[90%]">
        <h1 class=" w-full text-start text-white font-semibold">Ongoing Projects</h1>
        <div class=" w-full flex flex-col space-y-2 text-white font-semibold text-xl ">
            {#if data?.returnObject?.ongoing?.length>0 }
                 {#each data?.returnObject?.ongoing as project}
                    <Ongoingproject on:delete={deleteProject('ongoing',data.userUid,project.title)}  description={project.description} tasks={project.tasks} title={project.title} route={`/${data.userUid}/project/ongoing/${project.title}`}/>
                {/each} 
                 {:else}
                    You do not have any ongoing projects
            {/if}
            
        </div>
    </div>    
    <Toaster/>
</div>