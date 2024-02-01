<script lang="ts">
    import Logo from '$lib/components/logo.svelte';
    
    import Icon from '@iconify/svelte';
    import toast,{Toaster} from 'svelte-french-toast'
    export let form;
    let emailAdress =''
    let password =''
</script>

<div class=" w-screen h-screen pb-2 bg-gray-800 flex flex-col items-center space-y-2">
    <Logo/>

      <section class=" h-[90%] w-[90%] flex flex-col space-y-2">
        <h1 class=" text-white font-bold text-2xl text-left">Welcome Back!</h1>
    <form class='  flex flex-col space-y-3' method="post" action="?/login">

        <label class=" text-slate-400 flex flex-col space-y-1" for="emailaddress">
            Email-Address
          <input required class="  mt-1 p-1 outline-none text-gray-200 bg-slate-500" name="emailaddress" type='text' bind:value={emailAdress}/>
          </label>

          <label class=" text-slate-400 flex flex-col space-y-1" for="password">
            Password
          <input required class="  mt-1 p-1 outline-none text-gray-200 bg-slate-500" name="password" type='password' bind:value={password}/>
          <small class=" w-full flex justify-end mb-2"><a href="">Forgot password?</a></small>
          </label>

        <button on:click={()=>{
         if(!form){
          toast.success('Succesfylly logged in')
         }else{
          toast.error('Invalid login details')
         }
        }} type="submit"  class=" bg-orange-300 disabled:bg-gray-400 p-2" disabled={false }>Login</button>

    </form>

    <div class=" flex justify-evenly w-full items-center">
        <div class="h-1 bg-slate-300 w-[27%]"></div>
        <span class=" text-slate-500">Or continue with</span>
        <div class=" h-1 bg-slate-300 w-[27%]"></div>
      </div>

      <button class=" border-2 border-white text-white p-2 flex space-x-2  justify-center items-center" ><Icon icon="uil:google" /> <span>Google</span></button>
      <span class=" text-slate-400 ">Don't have an account ?<em class=" text-orange-300 not-italic "><a href="/signup">Sign up</a> </em></span>
    </section>
</div>

<Toaster/>