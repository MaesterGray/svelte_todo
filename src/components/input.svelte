<script lang=ts>
export let type:string;
export let icon:string;
export let input ='';
export let label:string;
import {createEventDispatcher} from 'svelte'

const dispatch = createEventDispatcher()
function handletyping(){
    dispatch('type')
}
</script>
<label class=" text-slate-400 " for={input}>{label}</label>
<div class=" bg-slate-600 flex h-[20%]">
    <div>{icon}</div>
    {#if type==='text'}
    <input class=" bg-slate-600 outline-none text-slate-500 " type='text' bind:value={input} id={input} />
    {:else if type ==='password'}
    <input class=" bg-slate-600 outline-none text-slate-500 " type='password' bind:value={input} id={input} />
    {:else if type ==='email'}
    <input class=" bg-slate-600 outline-none text-slate-500 " type='email' bind:value={input} id={input} />
  
        
    {/if}


</div>