<script>
    import { fade } from 'svelte/transition';
    import Completedtask from '$lib/components/Completedtask.svelte';
    import Ongoingproject from '$lib/components/Ongoingproject.svelte';
    let {data} = $props()
</script>

<div transition:fade class=" w-screen h-[92vh] bg-gray-800 flex flex-col items-center space-y-2 pt-3 overflow-y-scroll pb-3">

    <h1 class=" w-[90%] flex  h-[8vh] items-center justify-between">

        <div class=" flex flex-col">
            <small class=" text-orange-300">{'Welcome '}</small>
        <!-- <span class=" font-Square font-semibold text-lg text-white capitalize"> {data?.userDb?.lastname} {data?.userDb?.firstname}</span> -->
        </div>
        
        <a href={`/$ layout.userUid}/profile`} class=" w-[7vh] h-[7vh] rounded-md">
            <img src={'/workingman.jpeg'} class=" object-fill rounded-full w-full h-full" alt=""/>
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
                <!-- {#each layout?.userDb?.projects.completed as project,i}
                <Completedtask  title={project.title} description={project.description} position={i} route={`/$ layout.userUid}/${project.title}`} tasks={project.tasks}/>
            {/each}     -->
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
                    <Ongoingproject  description={project.description} tasks={project.tasks} title={project.title} route={`/dashboard/project/${project.id}`}/>
                {/each} 
                 {:else}
                    You do not have any ongoing projects
            {/if}
            
        </div>
    </div>    
</div>