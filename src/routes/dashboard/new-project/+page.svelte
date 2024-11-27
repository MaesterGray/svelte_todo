<script lang="ts">
    import type { Task } from '$lib';
    import Icon from '@iconify/svelte';
    import { flip } from 'svelte/animate';
    import { Toast ,} from '$lib/stores';
    import{ dateFormatter} from '$lib/utils'
	import { enhance } from '$app/forms';
    let title =$state('')
    let description =$state('')
    let tasks:Task[]=$state([])
   let duedate =$state('')
   let date = new Date()
   let year = date.getFullYear()
   let month = date.getMonth()+1
   let day = date.getDate()

    let {form}=$props()
   let isCreating = $state(false)

   $effect(()=>{
    if(form?.createProjectError){
        
        Toast.open({
            id:Math.random()*1000,
            dismissible:true,
            message:'Project creation failed',
            timeout:3000,
            type:'failure'
        })
    }
   })
</script>


<div class=" w-screen  flex flex-col items-center space-y-2 bg-gray-800 pt-5 pb-20 overflow-y-scroll">
    <h1 class=" w-[90%]  text-white font-Inter leading-7 flex items-center justify-center font-bold text-3xl">
        Create New Project
    </h1>

    <form class=" flex flex-col  font-Inter leading-7 font-semibold w-[90%] " 
    use:enhance={()=>{
        isCreating = true
        return async({update})=>{
            await update()
            isCreating = true
        }
    } }
    action="?/createProject"
     method="post">

        <label class="  flex flex-col text-white " for="title" >
            Project Title
            <input class="bg-slate-600 outline-none p-2 " name="title" bind:value={title}/>
        </label>
        
        <label class="  flex flex-col text-white" for="description">
            Project Description
            <textarea class="bg-slate-600 resize-none outline-none p-2 " name="description" bind:value={description}></textarea>
        </label>

        <label class="  flex flex-col text-white" for="due-date">
            Due Date
            <input type="date" class="bg-slate-600 resize-none outline-none p-2 " name="due-date" bind:value={duedate} min={dateFormatter(year,month,day)} />
        </label>
            <h3 class=" text-white font-bold text-xl">Tasks</h3>
       <input type="hidden" name='numberOfTasks' bind:value={tasks.length}>
       <div class=" flex flex-col space-y-5">
        {#each tasks as {index,name}(index)}
        <div class=" relative" animate:flip={{duration:200}}>
            <input required type="text" name={`${index}`} class=" w-full  bg-slate-600 p-2 outline-none text-white " bind:value={tasks[index].name}/>
                <button onclick={()=>tasks=tasks.filter((task)=>(task.index!==index))} class=" h-[40px] w-[40px] rounded-full flex items-center justify-center bg-slate-900 absolute -bottom-9 right-10 text-white z-10 mb-5">
                    <Icon icon="ic:baseline-delete" />
                </button>
        </div>
    {/each}
    <button class="  border border-black bg-orange-300" onclick={()=>{tasks = [...tasks,{isComplete:false,name:'',index:tasks.length}]}}>
        Add Task
    </button>

       </div>
	   
            

			{#if tasks.length!=0 && description!=='' && title!=='' && duedate!== ''}
            <button class=" bg-orange-300 text-center mt-5" type="submit">
                {isCreating?'...Creating project':'  Create Project'}            
            </button>

			{/if}

    </form>
</div>


<style>
   
</style>
