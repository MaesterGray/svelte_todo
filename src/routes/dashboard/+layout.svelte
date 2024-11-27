<script lang="ts">
    import Navigationbutton from '$lib/components/Navigationbutton.svelte';
    import {page} from '$app/stores'
    console.log($page.url.pathname)
    const navInfo =[
        {
            route:'/dashboard',
            type:'home',
            active:$page.url.pathname 
        },
        {
            route:`/dashboard/new-project`,
            type:'add',
            active:$page.url.pathname 
        },
        {
            route:`/dashboard`,
            type:'schedule',
            active:$page.url.pathname 
        }
    ]

    </script>
    
    <slot/>
    <div class="  fixed bottom-0 bg-gray-800 w-screen h-[8vh] shadow shadow-black  flex justify-around items-center z-10">
       {#each navInfo as {route,type,active}}
        <Navigationbutton route={route} type={type} active={active}/>
       {/each}
    </div>