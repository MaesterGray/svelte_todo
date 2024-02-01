<script lang="ts">
  import Icon from "@iconify/svelte";
  import workman from '$lib/assets/workingman_svelte_todo.jpeg';
  import { auth } from "$lib";
  import { signOut, } from "firebase/auth";
  import { goto } from "$app/navigation";

  
  export let data;



    let blockstyle =' flex w-full h-[7vh] bg-slate-600 '
    let edgedivstyles = ' w-[10%] h-full flex items-center justify-center text-slate-400'
    let middivstyles = 'w-[80%] p-3 text-white font-Inter'
    let isloggedIn =true
    function logout() {
        signOut(auth).then(()=>{
           goto('/loggedout',{replaceState:true}) 
        })
                
}

</script>

<div class=" w-screen h-screen bg-gray-800 flex flex-col space-y-3 items-center">
    <h1 class=" h-[8vh] w-[90%] text-center text-white ">
        <Icon icon="material-symbols-light:arrow-back" />

        Profile
    </h1>

    <div class=" w-[90%] flex justify-center">
        <div class=" w-[29vw] h-[29vw] rounded-full border border-orange-300">
            <img class=" object-fill w-[99%] h-[99%] rounded-full" src={workman} alt="">
        </div>
    </div>

    <div class=" flex flex-col space-y-3 w-[90%]">

        <div class={blockstyle}>
            <div class={edgedivstyles}><Icon icon="fluent:person-32-regular" /></div>
            <div class={middivstyles}></div>
            <div class={edgedivstyles}> <Icon icon="akar-icons:edit" /></div>
        </div>

        <div class={blockstyle}>
            <div class={edgedivstyles}><Icon icon="carbon:email" /></div>
            <div class={middivstyles}>{ data?.userDb?.signInMethod[0].email}</div>
            <div class={edgedivstyles}><Icon icon="akar-icons:edit" /></div>
        </div>

        <div class={blockstyle}>
            <div class={edgedivstyles}><Icon icon="solar:lock-linear" /></div>
            <div class={middivstyles}>Password</div>
            <div class={edgedivstyles}><Icon icon="akar-icons:edit" /></div>
        </div>

        <div class={blockstyle}>
            <div class={edgedivstyles}><Icon icon="solar:settings-line-duotone" /></div>
            <div class={middivstyles}>Settings</div>
            <div class={edgedivstyles}><Icon icon="akar-icons:edit" /></div>
        </div>
    </div>

        <button on:click={logout} class=" w-[90%] bg-orange-300 h-[7vh] flex justify-center items-center space-x-2 text-gray-800 font-semibold">
            <Icon icon="solar:logout-2-outline" />
            <span >logout</span>
        </button>
</div>