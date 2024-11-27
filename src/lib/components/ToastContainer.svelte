<script lang='ts'>
    import Icon from '@iconify/svelte';

    import { Toast } from '$lib/stores';

    
  </script>

  <div
    class=" toast fixed top-4 left-1/2 transform -translate-x-1/2 z-50 p-4 max-w-xs w-full bg-gray-800  text-white rounded-md shadow-lg transition-opacity duration-300 flex flex-col space-y-3"
    style:opacity={$Toast ? 1 : 0}
    style:visibility={$Toast ? 'visible' : 'hidden'}
  >
  {#if $Toast?.dismissible}
  <button class=" self-end" onclick={()=>Toast.close()}>x</button>
    
  {/if}
  <span class=" flex items-center space-x-2 w-full">
    {#if $Toast?.type==='failure'}
    <Icon icon="material-symbols:cancel" class=' text-red-600'/>
    {:else if $Toast?.type==='loading'}
    <Icon icon="tdesign:load"  class='  animate-spin'/>
    {:else}
    <Icon icon="weui:done2-filled" class=' text-green-600'/>
    {/if}

    <div>{$Toast?.message}</div>

  </span>
    
    
  </div>
    
  