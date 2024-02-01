<script lang="ts">
import { createEventDispatcher } from 'svelte';

export let index:number 
export let monthIndex:number
export let year:number
export let active:number

let daysOfTheWeek=['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
const dispatch = createEventDispatcher();

    function setActive(){
        dispatch('setactive',{
            index:index
        })
    }
</script>

<button on:click={setActive} class={`w-[13vw]  h-[9vh] flex flex-col space-y-1 bg-gray-600 flex-shrink-0 text-white text-Inter items-center  justify-center font-Inter`} class:text-orange-300={active===index+1}>
    <span class=" text-center">{index + 1}</span>
    <small class=" text-center">{daysOfTheWeek[new Date(year,monthIndex,index).getDay()]}</small>
</button>

<style>
    .text-orange-300{
        background-color: rgb(253,186,116);
        color: black;
    }
</style>