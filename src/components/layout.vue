<script setup>
import Footer from "./Footer.vue";
</script>
<template>
  <main class="mt-5 absolute w-full flex flex-col justify-center">
    <div class="container mx-auto mt-">
      <slot name="scope"></slot>
    </div>
    <div
      class="justify-center w-full flex bg-opacity-10 container mx-auto mt-10 mb-10 border min-h-screen rounded-md p-4 bg-white"
    >
      <div
        class="grid 2xl:grid-cols-4 xl:grid-cols-3 grid-cols-2 md:grid-cols-2 gap-5"
      >
        <slot name="prod"></slot>
      </div>
    </div>
    <Footer />
  </main>
</template>
