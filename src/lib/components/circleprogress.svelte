<script lang="ts">
  
    let {percentage,variant}:{percentage:number,variant:'ongoingproject'|'projectpage'}=$props()
    let circumfrence=125.68
  let offset:number ;
     offset =  circumfrence * ((100-percentage)/100)
  
</script>
{#key percentage}
<div class=" text-center "
class:svg-container={variant==='ongoingproject'}>

<div class=" relative">
<svg height='50px' width='50px' style="transform: rotate(-90deg);">
<circle class=" stroke-slate-700" cx='25' cy='25' r='20' fill='transparent'  stroke-width='3' stroke-dasharray={circumfrence}/>
<circle class=" stroke-orange-300" cx='25' cy='25' r='20' fill='transparent' stroke-linecap='round'  stroke-width='3' stroke-dasharray={circumfrence} stroke-dashoffset={offset}/>
</svg>
<span style="transform: translate(-50%,-50%);" class=" text-orange-300 font-Inter absolute left-[50%] top-[50%] text-sm">{percentage}%</span>
</div>
</div>
{/key}


<style>
    .svg-container{
        position: absolute;
        right: 0;
        bottom: 0;
    }
</style>