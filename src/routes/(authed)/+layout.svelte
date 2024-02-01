<script lang="ts">
import Navigationbutton from '$lib/components/navigationbutton.svelte';
import {page} from '$app/stores'
export let data;

const baseUrl = `/${data.userUid}`

const navInfo =[
    {
        route:baseUrl,
        type:'home',
        active:$page.url.pathname === baseUrl
    },
    {
        route:`/${data.userUid}/new-project`,
        type:'add',
        active:$page.url.pathname === `/${baseUrl}/new-project`
    },
    {
        route:`/${data.userUid}/schedule`,
        type:'schedule',
        active:$page.url.pathname === `/${baseUrl}/schedule`
    }
]
</script>

<slot/>
<div class="  fixed bottom-0 bg-gray-800 w-screen h-[8vh] shadow-md border-t flex justify-around items-center z-10">
   {#each navInfo as {route,type,active}}
    <Navigationbutton route={route} type={type} active={active}/>
   {/each}
</div>