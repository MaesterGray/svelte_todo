<script lang='ts'>
    let {variant,project}:{variant:'completed'|'ongoing',project:Project}= $props()

    import Icon from "@iconify/svelte";
     import Circleprogress from "$lib/components/Circleprogress.svelte";
     import { progressCalc } from "$lib/utils";
    import { dateFormatter } from "$lib/utils";
    import { hasBeenEdited } from "$lib/utils";
    import { onMount } from "svelte";
    import type {Project} from "$lib"
     let editmode = $state(false)
    // let  copyProject= {...data.project}
    let copyProject:Project = $state({
        description:'',
        duedate:'',
        tasks:[],
        title:''
    })
    copyProject = project
     let dialog:HTMLDialogElement;

    let openModal = false

    

    function editModeToggle(){
        editmode=!editmode; 
        if (editmode) {
            dialog.show()
        }else{
            dialog.close()
        }
    }
    let date = new Date()
   let year = date.getFullYear()
   let month = date.getMonth()+1
   let day = date.getDate()

    let hasbeenedited = $state(false)
    
      //$:hasbeenedited=  hasBeenEdited(data.project,copyProject) 

//    $:{ console.log(hasbeenedited,'hasbeen edited log')
//     console.log(copyProject.title,data.project.title,copyProject.title===data.project.title,copyProject.description===data.project.description)}
</script>

<div class="  bg-gray-800 w-screen h-[92vh] flex flex-col overflow-y-scroll  space-y-3 items-center pt-2">
    <h1 class=" h-[8vh] w-[90%] flex items-center justify-around text-white">
        <button onclick={()=>history.back()}><Icon icon="material-symbols-light:arrow-back" /></button>
        <span class=" font-Inter font-semibold">Project Details</span>
        <button onclick={editModeToggle}><Icon icon="akar-icons:edit" /></button>
    </h1>

    <input bind:value={copyProject.title} disabled={!editmode} class=" w-[90%] font-Square leading-relaxed text-white font-bold text-xl bg-transparent outline-none"/>
    

    <div class="  w-[90%]">

        <div class="h-[7vh]  flex space-x-2">
            <div class=" h-full w-10 bg-orange-300 flex justify-center items-center text-black">
            <Icon class=' w-[50%] h-[50%]'  icon="solar:calendar-bold" />
        </div>
        {#if editmode && copyProject.duedate}
           <input type="date" class=" bg-slate-600 resize-none outline-none p-2 font-light w-full text-white" bind:value={copyProject.duedate} min={dateFormatter(year,month,day)}/>
           {:else}
           <span class=" flex flex-col h-full">
               <small class=" text-slate-400">Due date</small>
               <p class=" font-Inter font-semibold text-white">{copyProject.duedate}</p>
           </span>
        {/if}
        
            
    </div>

    

</div>


 
<section class=" w-[90%] flex flex-col space-y-1 ">
    <h1 class=" text-white font-medium text-lg font-Inter leading-snug">Project Details</h1>
    <div class=" w-full h-fit"><textarea disabled={!editmode} bind:value={copyProject.description} class=" text-slate-300 text-sm leading-[18.5px] bg-transparent outline-none w-full overflow-y-visible resize-none"></textarea></div>
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
                <input bind:value={copyProject.tasks[i].name} disabled={!editmode} class=" bg-transparent outline-none"/>
                
                <div class=" h-[90%] w-10 bg-orange-300 flex items-center justify-center"> 
                   <input type="checkbox" disabled={!editmode} class=" accent-transparent " bind:checked={copyProject.tasks[i].isComplete}/>
               </div>

               <div class=" absolute bottom-[-50%]  right-[4%] text-white bg-opacity-25 flex space-x-2 flex-row-reverse" class:hidden={!editmode}>
                    <button onclick={()=>copyProject.tasks=copyProject.tasks.filter((presentTask)=>(presentTask.name!==task.name))} class=" h-[40px] w-[40px] rounded-full flex items-center justify-center bg-slate-900"><Icon icon="ic:baseline-delete" /></button>
                   <button onclick={()=>{copyProject.tasks =[...copyProject.tasks,{isComplete:false,name:'',index:copyProject.tasks.length}]}} class=" h-[40px] w-[40px] rounded-full flex items-center justify-center bg-slate-900"><Icon icon="basil:add-solid" /></button> 
               </div>
            </div>
        {/each}
    </div>
    <button onclick={()=>{copyProject={...copyProject,tasks:[...copyProject.tasks,{name:'',isComplete:false,index:copyProject.tasks.length}]}}} class=" bg-orange-300 p-2" class:hidden={editmode===false}>Add new task</button> 
</div>

{#if hasbeenedited===true && editmode } 
 <button onclick={()=>{
   editmode=false
  // handleUpdate(data.project,copyProject,data.userUid)
 }} class=" bg-orange-300 p-2">Save Changes</button> 
 {/if}


</div>
<dialog bind:this={dialog}>

</dialog> 




<style>
    .hidden{
        display: none;
    }
</style>