<script setup>
import { watch } from 'vue';
import {ref} from 'vue'
const genere = ref('')
const props = defineProps({
  title: String,
  img: String,
  text: String,
});

</script>

<template>

  <div

    class="bg-[#F8F8FF]   rounded-md text-slate-50 py-36 px-20  bg-cover contrast-125  justify-center items-center flex flex-col  xl:h-[500px] h-full bg-top bg-no-repeat"
    :class="img == 'male' ? `bg-[url('https://jairo3478.c35.integrator.host/images/genere/male/bg.jpg')]` : `bg-[url('https://jairo3478.c35.integrator.host/images/genere/female/bg.jpg')]`">
  
    <h1 class="text-[3.5rem] font-bold">
    
    </h1>
    <div
      class="mt-10 border-gray-500 font-semibold  xl:text-[1.5rem] absolute bottom-0 w-full  backdrop-blur-md p-4 bg-black  py-4 6 rounded-md bg-opacity-50">
      {{ text }} 
    
    </div>
    <h1 class="absolute left-2 md:text-6xl top-20 font-bold uppercase drop-shadow-lg  p-3 bg-black/50 rounded-md shadow-2xl"><span v-if="img === 'male'? genere = 'masculina':  genere ='feminina' " class="border-b-4">Moda {{ genere }}</span> </h1>
  </div>
</template>
