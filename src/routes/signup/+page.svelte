<script lang="ts">

    import {fade} from 'svelte/transition'
    import Icon from '@iconify/svelte';
    import type { ActionData } from './$types.js'
    import Logo from '$lib/components/logo.svelte';
   
      let firstname =''
      let lastname =''
      let emailAdress = ''
      let password=''
      let passwordConfirmation =''
      let hasReadTandC = false
      let isMatching = true
      let hasbeenchanged = false
      let isEmailValid = false
      let emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      $:{
        if (password !== passwordConfirmation) {
          isMatching  = false
        }else{
          isMatching=true
        }
        
        if ( emailRegex.test(emailAdress)) {
          isEmailValid===true
        }
          console.log(isEmailValid)
      }
  </script>

  <div class=" w-screen h-screen pb-2 bg-gray-800 flex flex-col items-center space-y-2">
  
    <Logo/>
    
    <section class=" h-[90%] w-[90%] flex flex-col space-y-2">
    <h1 class=" text-white font-bold text-2xl text-left">Create your account</h1>
  
    <div class=" flex flex-col space-y-2">
      
    </div>
  
      <form class=" flex flex-col space-y-3" action="?/signup" method="post">
       <label class="text-slate-400 flex flex-col space-y-1" for="firstname">
        First-name
        <input required class="  mt-1 p-1 outline-none text-gray-200 bg-slate-500" name="firstname" type="text" bind:value={firstname} />
      </label>

        <label class=" text-slate-400 flex flex-col space-y-1" for="lastname">
          Last-name
          <input required class="  mt-1 p-1 outline-none text-gray-200 bg-slate-500" name="lastname" type="text" bind:value={lastname}/>
        </label>

        <label class=" text-slate-400 flex flex-col space-y-1" for="emailaddress">
          Email-Address
        <input required class="  mt-1 p-1 outline-none text-gray-200 bg-slate-500" name="emailaddress" type='text' bind:value={emailAdress}/>
        </label>

        <label class="text-slate-400 flex flex-col space-y-1" for="password">
          Password
          <div class=" decoration-wavy underline decoration-orange-300">{password.length<8 && password.length >0 ?'password must be at least 8 characters long':''}</div>
        <input required class="  mt-1 p-1 outline-none text-gray-200 bg-slate-500" name="password" type="password" bind:value={password}/>
        </label>

        <label class="text-slate-400 flex flex-col space-y-1" for="password-confirmation">
          Confirm Password
          <div class=" decoration-wavy underline decoration-orange-300">
          {!isMatching && hasbeenchanged?'Passwords do not match':''}

          </div>

        <input on:input={()=>{if (hasbeenchanged===false) {
          hasbeenchanged = true
        } }} required class="  mt-1 p-1 outline-none text-gray-200 bg-slate-500" name="password-confirmation" type="password" bind:value={passwordConfirmation}/>
        </label>

        <div class=" flex space-x-3 items-center pt-1 ">
          <input required type="checkbox" bind:checked={hasReadTandC}/>
          <span class=" text-slate-500">I have read & agreed to DayTask <em class=" text-orange-300 not-italic">Privacy Policy, Terms and conditions</em></span>
        </div>

        <button type="submit"  class=" bg-orange-300 disabled:bg-gray-400 p-2" disabled={!hasReadTandC && isMatching && !isEmailValid }>Signup</button>
      </form>
  
      
  
      <div class=" flex justify-evenly w-full items-center">
        <div class="h-1 bg-slate-300 w-[27%]"></div>
        <span class=" text-slate-500">Or continue with</span>
        <div class=" h-1 bg-slate-300 w-[27%]"></div>
      </div>
  
      <button class=" border-2 border-white text-white p-2 flex space-x-2  justify-center items-center" ><Icon icon="uil:google" /> <span>Google</span></button>
      <span class=" text-slate-400 ">Already have an account? <em class=" text-orange-300 not-italic"><a href="/login">login</a> </em></span>
    </section>
  </div>
  
  