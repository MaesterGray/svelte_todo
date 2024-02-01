<script lang='ts'>
    export let name:string;
    export let timeRange:string;
</script>

<div class=" w-full h-[7vh] bg-gray-800 flex-col p-2 space-y-2 ">
    <h1>{name}</h1>
    <p>{timeRange}</p>
</div>