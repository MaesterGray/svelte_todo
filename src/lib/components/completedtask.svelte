<script lang="ts">
    import {createEventDispatcher} from 'svelte'
    import type { Task } from "$lib";
    import Icon from '@iconify/svelte';

    
    let {position,title,route,description,tasks}:{position:number,title:string,route:string,description:string,tasks:Task[]} = $props()   
        const dispatch = createEventDispatcher()
    
            // function deleteProject(){
            //     dispatch('delete',{
            //         project:{
            //             isComplete:true,
            //             tasks:tasks,
            //             title:title,
            //             desription:description,
    
            //         }
            //     })
            // }
    </script>
    
    <div class:first={position===0} class=" bg-slate-600 p-1 h-full w-[45%] flex flex-col flex-shrink-0 justify-around">
        
        <a href={route}  class="  text-2xl font-Square text-white h-[50%]  text-ellipsis" class:first-text={position===0}>
            {title}
        </a>
    
        <span class=" w-full flex flex-col">
            <p class=" flex justify-evenly">
                <small>Completed</small>
                 <button class=" text-white " class:first-text={position===0} ><Icon icon="ic:baseline-delete" /></button>
            </p>
    
            <div class=" w-full h-1 bg-white rounded-md" class:first-completed-bar={position===0}></div>
        </span>
    </div>
    
    <style>
        .first{
            background-color:#cfa12d ;
            color: black;
    
        }
        .first-completed-bar{
            background-color: black;
        }
        .first-text{
            color:black;
        }
    </style>