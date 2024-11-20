<script lang='ts'>
    let {variant,project,userId,projectId}:{variant:'completed'|'ongoing',project:Project,userId:string,projectId:string}= $props()
    import { toastOpen } from "$lib/stores";
    import Icon from "@iconify/svelte";
     import { progressCalc } from "$lib/utils";
     import Circleprogress from "./circleprogress.svelte";
    import { dateFormatter } from "$lib/utils";
    import { hasBeenEdited } from "$lib/utils";
    import type {Project} from "$lib"
    import updateProject from "$lib/mutations/updateProject";
    import { projectIsComplete } from "$lib/utils";
     let editmode = $state(false)
    let copyProject:Project = $state({
        description:'',
        dueDate:'',
        tasks:[],
        title:''
    })
    copyProject = project
    let isBeingUpdated = $state(false)


    function editModeToggle(){
        editmode=!editmode; 
    }

   async function handleUpdate(){
    isBeingUpdated = true
    let isComplete = projectIsComplete(copyProject.tasks)
   await updateProject(userId,projectId,variant,isComplete,copyProject)
   try{
    editmode=false
    toastOpen.set({
        type:'success',
        message:'Project updates successfully',
        open:true
    })
   }catch(err){
        console.error(err)
   }
   }
    let date = new Date()
   let year = date.getFullYear()
   let month = date.getMonth()+1
   let day = date.getDate()
 
    let hasbeenedited = $state(false)
    // let projectIsComplete = $state(false)
    $effect(()=>{
        hasbeenedited=hasBeenEdited(project,copyProject)
        console.log(hasbeenedited)
    })
    //$inspect(hasbeenedited)
</script>

<div class="  bg-gray-800 w-screen h-[92vh] flex flex-col overflow-y-scroll  space-y-3 items-center py-5">
    <h1 class=" h-[8vh] w-[90%] flex items-center justify-around text-white">
        <button onclick={()=>history.back()}>
            <Icon icon="material-symbols-light:arrow-back" />
        </button>
        <span class=" font-Inter font-semibold">
            Project Details
        </span>
        <button onclick={editModeToggle}>
            <Icon icon="akar-icons:edit" />
        </button>
    </h1>

    <input bind:value={copyProject.title} disabled={!editmode} class=" w-[90%] font-Square leading-relaxed text-white font-bold text-xl bg-transparent outline-none"/>
    

    <div class="  w-[90%]">

        <div class="h-[7vh]  flex space-x-2">
            <div class=" h-full w-10 bg-orange-300 flex justify-center items-center text-black">
            <Icon class=' w-[50%] h-[50%]'  icon="solar:calendar-bold" />
        </div>
        {#if editmode && copyProject.dueDate}
           <input type="date" class=" bg-slate-600 resize-none outline-none p-2 font-light w-full text-white" bind:value={copyProject.dueDate} min={dateFormatter(year,month,day)}/>
           {:else}
           <span class=" flex flex-col h-full">
               <small class=" text-slate-400">Due date</small>
               <p class=" font-Inter font-semibold text-white">{copyProject.dueDate}</p>

           </span>
        {/if}
        
            
    </div>

    

</div>


 
<section class=" w-[90%] flex flex-col space-y-1 ">
    <h1 class=" text-white font-medium text-lg font-Inter leading-snug">Project Details</h1>
    <div class=" w-full h-fit">
        <textarea disabled={!editmode} bind:value={copyProject.description} class=" text-slate-300 text-sm leading-[18.5px] bg-transparent outline-none w-full overflow-y-visible resize-none"></textarea>
    </div>
</section>

<span class=" w-[90%] flex justify-between">
    <h1 class="text-white font-medium text-lg font-Inter leading-snug">
        Project Progress
    </h1>
    <Circleprogress percentage={progressCalc(copyProject.tasks)} variant='projectpage'/>
</span>

<div class="w-[90%] flex flex-col space-y-2">
    <h1 class="text-white font-medium text-lg font-Inter leading-snug ">All Tasks</h1>

    <div class="  ">
        {#each copyProject.tasks as task,i}
            <div class=" text-white bg-slate-600 font-Inter leading-snug font-medium text-lg h-[8vh] w-full flex items-center p-2 justify-between relative  mb-11">
                <input bind:value={copyProject.tasks[i].name} disabled={editmode} class=" bg-transparent outline-none"/>
                
                <div class=" h-[90%] w-10 bg-orange-300 flex items-center justify-center"> 
                   <input type="checkbox" disabled={!editmode} class=" accent-transparent " bind:checked={copyProject.tasks[i].isComplete}/>
               </div>

               <div class=" absolute bottom-[-50%]  right-[4%] text-white bg-opacity-25 flex space-x-2 flex-row-reverse" class:hidden={!editmode}>
                    <button onclick={()=>copyProject.tasks=copyProject.tasks.filter((presentTask)=>(presentTask.name!==task.name))} class=" h-[40px] w-[40px] rounded-full flex items-center justify-center bg-slate-900">
                        <Icon icon="ic:baseline-delete" />
                    </button>
                   <button onclick={()=>{copyProject.tasks =[...copyProject.tasks,{isComplete:false,name:'',index:copyProject.tasks.length}]}} class=" h-[40px] w-[40px] rounded-full flex items-center justify-center bg-slate-900">
                    <Icon icon="basil:add-solid" />
                </button> 
               </div>
            </div>
        {/each}
    </div>
    <button onclick={()=>{copyProject={...copyProject,tasks:[...copyProject.tasks,{name:'',isComplete:false,index:copyProject.tasks.length}]}}} class=" bg-orange-300 p-2" class:hidden={editmode===false}>
        Add new task
    </button> 
</div>

{#if hasbeenedited && editmode } 
 <button onclick={handleUpdate} class=" bg-orange-300 p-2">
    {isBeingUpdated?'Saving Changes ...':'Save Changes'}
</button> 
 {/if}


</div>


<style>
    .hidden{
        display: none;
    }
</style>