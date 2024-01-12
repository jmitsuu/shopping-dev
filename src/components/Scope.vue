<script setup>
defineProps({
  title: String,
  img: String,
  text: String,
});
</script>

<template>
  <div
    class="bg-gray-900 rounded-md text-slate-50 py-16 px-20 bg-cover bg-bottom bg-no-repeat"
    :class="img"
  >
    <h1 class="text-[3.5rem] font-bold">
      <span class="border-b-[0.1rem]">
        {{ title }}
      </span>
    </h1>
    <p
      class="mt-10 border-gray-500 font-semibold bg-black text-center py-4 rounded-md bg-opacity-50"
    >
      {{ text }}
    </p>
  </div>
</template>
