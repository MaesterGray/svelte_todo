<script lang="ts">
    import type { Task } from '$lib';
    import Icon from '@iconify/svelte';
    import { flip } from 'svelte/animate';

    import{ dateFormatter} from '$lib/utils'
    let title =$state('')
    let description =$state('')
    let tasks:Task[]=$state([])
   let duedate =$state('')
   let date = new Date()
   let year = date.getFullYear()
   let month = date.getMonth()+1
   let day = date.getDate()
	
   $effect(()=>{
	console.log(tasks)
   })

//    async function handleCreate() {
//     const docRef = doc(db,'users',$page.params.uid,'ongoing',title)
//     await setDoc(docRef,new Project(false,tasks,description,title,reminder,duedate).toFirestore())    
//     try{
//         toast.success('Project created succesfully')
//         invalidate('app:home').then(()=>{
//             goto(`/${data.userUid}/project/ongoing/${title}`,{
//                 replaceState:true
//             })
//         })

//     }catch(err){
//         toast.error('Try again later')
//         console.error(err)
//     }
//    }
//   console.log(data.userDb) 
</script>


<div class=" w-screen h-[92vh] flex flex-col items-center space-y-2 bg-gray-800 ">
    <h1 class=" w-[90%] text-center text-white font-Inter leading-7">
       <button onclick={()=>history.back()}> <Icon icon="material-symbols-light:arrow-back" /></button>
        Create New Project
    </h1>

    <form class=" flex flex-col space-y-6 font-Inter leading-7 font-semibold w-[90%] h-screen justify-between" action="?/createProject" method="post">

        <label class="  flex flex-col text-white " for="title" >
            Project Title
            <input class="bg-slate-600 outline-none p-2 font-light " name="title" bind:value={title}/>
        </label>
        
        <label class="  flex flex-col text-white" for="description">
            Project Description
            <textarea class="bg-slate-600 resize-none outline-none p-2 font-light" name="description" bind:value={description}></textarea>
        </label>

        <label class="  flex flex-col text-white" for="due-date">
            Due Date
            <input type="date" class="bg-slate-600 resize-none outline-none p-2 font-light" name="due-date" bind:value={duedate} min={dateFormatter(year,month,day)} />
        </label>
  
       <input type="hidden" name='numberOfTasks' bind:value={tasks.length}>
	   {#each tasks as {index,name}(index)}
                <div class=" relative w-full h-[5vh] mb-11 flex flex-col space-y-3"
                animate:flip={{duration:200}}>
                    <input required type="text" name={`${index}`} class=" w-full  bg-slate-600 p-2 outline-none text-white font-light" bind:value={tasks[index].name}/>
                    <div class=" absolute bottom-10 right-10 text-white bg-opacity-25 flex space-x-2 flex-row-reverse">
                        <button onclick={()=>tasks=tasks.filter((task)=>(task.index!==index))} class=" h-[40px] w-[40px] rounded-full flex items-center justify-center bg-slate-900"><Icon icon="ic:baseline-delete" /></button>
                    </div>
                </div>
            {/each}
        <button class="  border border-black bg-orange-300" onclick={()=>{tasks = [...tasks,{isComplete:false,name:'',index:tasks.length}]}}>Add Task</button>
            

			{#if tasks.length!=0}
            <button class=" bg-orange-300 text-center " type="submit"   >Create Project</button>

			{/if}

    </form>
</div>


<style>
   
</style>
