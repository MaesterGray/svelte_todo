<script lang="ts">
    import type { Task } from "$lib";
    import Icon from '@iconify/svelte';
    import { progressCalc } from "$lib/utils";
    import Circleprogress from "./circleprogress.svelte";
    import deleteProject from "$lib/mutations/deleteProject";


    let {title,tasks,route,projectId,userId}:{title:string,tasks:Task[],route:string,projectId:string,userId:string}=$props()
    let isBeingDeleted = $state(false)
  
</script>
<div class=" w-full h-[12vh] p-1 flex bg-slate-600 relative">
    <a href={route}  class=" w-full font-Square text-2xl text-white flex ">
       <span>{title}</span> 
    </a>
    <Circleprogress variant='ongoingproject' percentage={progressCalc(tasks)}/>
    <button class=" text-white absolute left-0 bottom-2" onclick={()=>{isBeingDeleted=true;deleteProject('ongoing',userId,projectId)}}>
        {#if isBeingDeleted}
        <Icon icon="tdesign:load" class=' animate-spin'/>
        {:else}
        <Icon icon="ic:baseline-delete" />
            
        {/if}
    </button>

</div>