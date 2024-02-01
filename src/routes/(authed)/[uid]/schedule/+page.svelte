<script lang="ts">
    import type { PageData } from './$types';
    import type {ComponentEvents} from 'svelte'
    import {db} from '$lib'
    import Icon from '@iconify/svelte';
    import Dateindicator from '$lib/components/dateindicator.svelte'
    import { getDocs,collection } from 'firebase/firestore';
    import type DocumentData from 'firebase/firestore';
    export let data: PageData;

    let presentDay = new Date()
    let monthIndex = presentDay.getMonth()
    let presentYear = presentDay.getFullYear()
    let active = presentDay.getDate()
    let monthMap =[
        {name:'January',
        noOfDays:31
        },{name:'February',
        noOfDays:28
        },{name:'March',
        noOfDays:31
        },{name:'April',
        noOfDays:30
        },{name:'May',
        noOfDays:31
        },{name:'June',
        noOfDays:30
        },{name:'July',
        noOfDays:31
        },{name:'August',
        noOfDays:31
        },{name:'September',
        noOfDays:31
        },{name:'October',
        noOfDays:31
        },{name:'November',
        noOfDays:30
        },{name:'December',
        noOfDays:31
        },
    ]
    let emptyArray = new Array(monthMap[monthIndex].noOfDays)

    function setActive(event:ComponentEvents<Dateindicator>['setactive']){
            if (event.detail.index+1 ===active) {
                
            }else{
                active = event.detail.index+1
            }
    }

    async function populateNotifications() {
    try {
        const ongoingProjectsSnapshot = await getDocs(collection(db, 'users', `${data.userUid}`, 'ongoing'));

        const tempArray = ongoingProjectsSnapshot.docs.map(doc => doc.data());

        return tempArray;
    } catch (error) {
        console.error("Error fetching ongoing projects:", error);
        return []; // Return an empty array or handle the error accordingly
    }
}
           


     populateNotifications().then((response)=>{
        console.log(response)
     })

    
    
</script>

<main class=" w-screen h-[92vh] bg-gray-800 pl-10 flex flex-col space-y-5">
    <h1 class=" h-[8vh] w-full text-center text-white flex items-center  justify-center">
        <Icon icon="material-symbols-light:arrow-back" />

        Schedule
    </h1>

    <h1 class=" text-white  font-bold text-lg font-Inter">{monthMap[monthIndex].name}</h1>

    <div class=" w-[90%] overflow-x-scroll flex space-x-3">
        {#each emptyArray as element,i}
            <Dateindicator on:setactive={setActive} year={presentYear} index={i} monthIndex={monthIndex} active={active}/>
        {/each}
    </div>

    <h1 class=" text-white font-bold text-lg font-Inter">Today's Tasks</h1>
    {#key active}
        <div>

        </div>
    {/key}
</main >