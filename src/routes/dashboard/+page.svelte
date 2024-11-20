<script>
    import { fade } from 'svelte/transition';
    // @ts-ignore
    import Completedtask from '$lib/components/completedtask.svelte';
    // @ts-ignore
    import Ongoingproject from '$lib/components/ongoingproject.svelte';
    import { signOut } from 'firebase/auth';
    import { auth } from '$lib/firebaseconfig';
    let {data} = $props()

    async function handleSignOut() {
      await  fetch('/',{
            method:'delete'
        })
        try {
            signOut(auth)
        } catch (error) {
           //pop toast 
        }
    }
</script>

<div transition:fade class=" w-screen h-[92vh] bg-gray-800 flex flex-col items-center space-y-2 pt-3 overflow-y-scroll pb-3">

    <h1 class=" w-[90%] flex  h-[8vh] items-center justify-between">

        <div class=" flex flex-col">
            <small class=" text-orange-300">{'Welcome '}</small>
        </div>
        
        <div  class=" w-[7vh] h-[7vh] rounded-md">
            <img src={data.returnObject.profilePic} class=" object-fill rounded-full w-full h-full" alt=""/>
        </div>

        <button class=" rounded-md font-bold p-3 hover:bg-red-500 hover:text-white bg-gray-900 shadow-md text-orange-400 active:bg-red-500 active:text-white"> Sign out</button>
    </h1>

    <div class=" flex space-x-2 w-[90%]">
        <input class=" w-[90%] bg-slate-600 text-slate-500" type="search"  placeholder="Search tasks"/>
        <div></div>
    </div>

    <div class=" flex flex-col space-y-3 w-[90%] flex-shrink-0">
        <h1 class=" w-full text-start text-white font-semibold">Completed Projects</h1>
        <div class=" h-[20vh] overflow-x-scroll flex space-x-3 w-[90vw] text-white font-semibold text-xl items-center ">
                {#if data.returnObject.completed.length>0}
                {#each data?.returnObject?.completed as project,i}
                    <Completedtask userId={data.returnObject.userId} projectId={project.id}  title={project.data.title} route={`/dashboard/project/completed/${project.id}`} position={i}/>
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
                    <Ongoingproject userId={data.returnObject.userId} projectId={project.id}  tasks={project.data.tasks} title={project.data.title} route={`/dashboard/project/ongoing/${project.id}`}/>
                {/each} 
                 {:else}
                    You do not have any ongoing projects
            {/if}
            
        </div>
    </div>    
</div>