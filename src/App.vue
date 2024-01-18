<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Menu from './components/Menu.vue';
import Footer from './components/Footer.vue';



</script>

<template>
  <main class="">


  <Menu />

  <div class="min-h-screen bg-white ">
    <RouterView />
  </div>

  <Footer />
</main>
</template>

<style scoped></style>
