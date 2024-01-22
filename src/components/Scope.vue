<script setup>
import { watch } from 'vue';

const props = defineProps({
  title: String,
  img: String,
  text: String,
});

</script>

<template>
  <div
    class="bg-[#F8F8FF]  rounded-md text-slate-50 py-16 px-20 bg-cover contrast-125  justify-center items-center flex flex-col  xl:h-[500px] h-full bg-top bg-no-repeat"
    :class="`bg-[url('../assets/images/${props.img}/bg.jpg')]`">
    <h1 class="text-[3.5rem] font-bold">
      <span class="border-b-[0.1rem]  ">
        {{ title }}
      </span>
    </h1>
    <div
      class="mt-10 border-gray-500 font-semibold  xl:text-[2.5rem]  backdrop-blur-md p-4 bg-black  py-4 6 rounded-md bg-opacity-50">
      {{ text }}
    </div>
  </div>
</template>
