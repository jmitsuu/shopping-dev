<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Menu from './components/Menu.vue';
import Footer from './components/Footer.vue';



</script>

<template>
 <Menu />
  
  <div class="min-h-screen bg-slate-10 ">
    <RouterView />
  </div>

  <Footer/>
</template>

<style scoped></style>
