<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    onMount(()=>{
        setTimeout(()=>{
            goto('/',{replaceState:true})
        },1500)
    })
</script>


<div class=" w-screen h-screen flex justify-center items-center bg-gray-800 ">
    <p class=" font-Square text-2xl text-white">You Have sucessfully logged out of your account</p>
</div>