<script>
  import workman from '$lib/assets/workingman_svelte_todo.jpeg';
</script>

<div class=" w-screen h-screen bg-gray-800 flex justify-center ">
  <div class=" flex items-center flex-col w-[90%] h-[90%] space-y-3">
      <h1 class=" h-[20%] w-full flex justify-center items-center"><img src="" alt=""></h1>
      <img class="  h-[40%]" src={workman} alt="">
      <h1 class=" text-3xl text-white text-center font-Square">Manaage Your Tasks And Projects With <em class=" text-orange-300 ">DayTask</em></h1>
      <a href="/signup"><button class=" p-2 bg-orange-300 font-semibold font-Inter">Get Started</button></a>
      <a href="/login"><button class=" p-2 bg-orange-300  font-semibold font-Inter ">Continue where you left off</button></a>

  </div>
      
</div>