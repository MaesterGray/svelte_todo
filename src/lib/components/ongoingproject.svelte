<script lang="ts">
    import type { Task } from "$lib";
    import Icon from '@iconify/svelte';
    import { progressCalc } from "$lib/utils";
    import {createEventDispatcher} from 'svelte'
    import Circleprogress from "./circleprogress.svelte";

    export let title:string;
    export let tasks:Task[]
    export let route:string
    export let description:string
    const dispatch = createEventDispatcher()

    function deleteProject(){
        dispatch('delete',{
            project:{
                description:description,
                isComplete:false,
                tasks:tasks,
                title:title
            }
        })
    }
</script>
<div class=" w-full h-[12vh] p-1 flex bg-slate-600 relative">
    <a href={route}  class=" w-full font-Square text-2xl text-white flex ">
       <span>{title}</span> 
    </a>
    <Circleprogress variant='ongoingproject' percentage={progressCalc(tasks)}/>
    <button class=" text-white absolute left-0 bottom-2" on:click={deleteProject}><Icon icon="ic:baseline-delete" /></button>

</div>