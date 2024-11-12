<script lang="ts">
    import Icon from '@iconify/svelte'; 
     
    let {active,type,route}:{active:boolean,type:string,route:string}=$props()
 </script>

 
    <a href={route}>
        {#if type==='home'}
    <div class='h-[90%] w-[15vw] flex flex-col  font-inter leading-none  text-slate-500 items-center'
     class:text-orange-300={active}>
        <Icon class=' w-[10vw] h-[5vh]' icon="mingcute:home-4-fill" />
        <small>Home</small>
    </div>
          {:else if type === 'add'} 
    <div class="  h-[90%] w-[15vw] flex flex-col space-y-1 font-inter leading-none bg-orange-300 justify-center items-center text-black">
        <Icon class=' w-[10vw] h-[5vh]'  icon="basil:add-solid" />
    </div>
        {:else if type=== 'schedule'}
    <div class="  h-[90%] w-[15vw] flex flex-col  font-inter leading-none  text-slate-500 items-center"
    class:text-orange-300={active}>
        <Icon class=' w-[10vw] h-[5vh] '  icon="solar:calendar-bold" />
        <small>Schedule</small>

    </div>
        {/if}

    </a>

    <style>
        .text-orange-300{
            color: rgb(253,186,116);
        }
    </style>