
<script>

    import {fade} from 'svelte/transition'
    import { firebaseConfig } from "$lib";
      let name =''
      let emailAdress = ''
      let password=''
      let hasReadTandC = false
      let firstPage = true
      import { getAuth, signInWithRedirect,GoogleAuthProvider } from "firebase/auth";
      import { initializeApp } from "firebase/app";
  const app = initializeApp(firebaseConfig);
      
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider()
  
  function handleSignin (){
    signInWithRedirect(auth,googleProvider)
  }
  </script>
  

    


  <div class=" w-screen h-screen bg-gray-800 flex flex-col items-center space-y-2">
  
    <div class=" w-screen flex justify-center">
      <div class=" w-[32vw] h-[12vh] flex flex-col justify-center items-center">
        <img src="" alt="">
        <h1>Day <em class=" text-orange-300">Task</em></h1>
      </div>
    </div>
    
    <section class=" h-[90%] w-[90%] flex flex-col space-y-2">
    <h1 class=" text-white font-bold text-2xl text-left">Create your account</h1>
  
    <div class=" flex flex-col space-y-2">
      
    </div>
  
      <div class=" flex space-x-2">
        <input type="checkbox" bind:checked={hasReadTandC}/>
        <span class=" text-slate-500">I have read & agreed to DayTask <em class=" text-orange-300">Privacy Policy, Terms and conditions</em></span>
      </div>
  
      <button  class=" bg-orange-300 disabled:bg-gray-400 p-2" disabled={!hasReadTandC}>Signup</button>
  
      <div class=" flex space-x-1">
        <div class="h-1 bg-slate-300 w-auto"></div>
        <span class=" text-slate-500">Or continue with</span>
        <div class=" h-1 bg-slate-300 w-auto"></div>
      </div>
  
      <button class=" border-2 border-white text-white p-2" on:click={handleSignin}> Google</button>
      <span>Don't have an account <em class=" text-orange-300">Sign up</em></span>
    </section>
  </div>
  
  