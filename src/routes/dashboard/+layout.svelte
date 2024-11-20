<script lang="ts">
    import Navigationbutton from '$lib/components/Navigationbutton.svelte';
    import {page} from '$app/stores'
    import Toast from '$lib/components/ToastContainer.svelte';
    const navInfo =[
        {
            route:'/dashboard',
            type:'home',
            active:$page.url.pathname === '/dashboard'
        },
        {
            route:`/dashboard/new-project`,
            type:'add',
            active:$page.url.pathname === `/dashboard/new-project`
        },
        {
            route:`/dashboard`,
            type:'schedule',
            active:$page.url.pathname === `/dashboard/schedule`
        }
    ]

    </script>
    
    <slot/>
    <div class="  fixed bottom-0 bg-gray-800 w-screen h-[8vh] shadow-md border-t flex justify-around items-center z-10">
       {#each navInfo as {route,type,active}}
        <Navigationbutton route={route} type={type} active={active}/>
       {/each}
    </div>
    <Toast/>