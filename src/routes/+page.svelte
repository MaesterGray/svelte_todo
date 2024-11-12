<script lang='ts'>
    import Logo from '$lib/components/Logo.svelte'
    import Icon from '@iconify/svelte';
    import {signInWithPopup,GoogleAuthProvider} from 'firebase/auth'
    import {auth} from '$lib/firebaseconfig'
    import { goto } from '$app/navigation';

    const provider = new GoogleAuthProvider()

    async function signInWithGoogle(){
		try{
			const {user} = await signInWithPopup(auth,provider)
			const idToken = await user.getIdToken();

			const response = await fetch('/', {
				method: 'POST',
				body: JSON.stringify(idToken),
				headers: {
					'content-type': 'application/json'
				}
			});
			if (!response.ok) {
				const errorResponse = await response.json();
				return;
			}
			
			goto('/dashboard');
		}catch(error){
			const errorMessage = (error as Error).message
			console.log(errorMessage)
		}

	}
</script>
<div class=" w-screen h-screen pb-2 bg-gray-800 flex flex-col items-center space-y-2">
  
    <Logo/>
    
    <section class=" h-[90%] w-[90%] flex flex-col space-y-2 items-center">
    <h1 class=" text-white font-bold text-2xl text-center">Welcome to Day Task</h1>
    <img class=" lg:w-[35%] aspect-square rounded-md" src="/workingman.jpeg" alt='picture'/>    
    <button class=" flex space-x-1  items-center p-2 bg-orange-300 rounded-md" onclick={signInWithGoogle}>
        <span class=" text-lg font-bold ">Continue with Google </span>
        <Icon icon="flat-color-icons:google" /></button>
    </section>
</div>