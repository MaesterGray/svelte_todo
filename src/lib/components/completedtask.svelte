<script lang="ts">
    import Icon from '@iconify/svelte';
    import deleteProject from "$lib/mutations/deleteProject";
    import { Toast } from '$lib/stores';
    let {position,title,route,userId,projectId}:{position:number,title:string,route:string,userId:string,projectId:string} = $props()   
    
    let isBeingDeleted = $state(false)

    async function handleDelete(){
        isBeingDeleted=true;
        
        await deleteProject('completed',userId,projectId)
        try{
            isBeingDeleted = false
            Toast.open({
                id:Math.random()*1000,
                dismissible:true,
                timeout:3000,
                message:'Project deleted successfully',
                type:'success'
            })
        }catch(err){
            Toast.open({
                id:Math.random()*1000,
                dismissible:true,
                timeout:3000,
                message:'Project deletion failed',
                type:'failure'
            })
        }
    }
    </script>
    
    <div class:first={position===0} class=" bg-slate-600 p-1 h-full w-[45%] flex flex-col flex-shrink-0 justify-around">
        
        <a href={route}  class="  text-2xl font-Square text-white h-[50%]  text-ellipsis" class:first-text={position===0}>
            {title}
        </a>
    
        <span class=" w-full flex flex-col">
            <p class=" flex justify-evenly">
                <small>Completed</small>
                 <button class=" text-white " class:first-text={position===0} onclick={handleDelete}>
                    {#if isBeingDeleted}
                    <Icon icon="tdesign:load" class=' animate-spin'/>
                    {:else}
                    <Icon icon="ic:baseline-delete" />
                        
                    {/if}
                </button>
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