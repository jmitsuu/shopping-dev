<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Menu from './components/Menu.vue';
import Footer from './components/Footer.vue';

import Cart from "./components/Cart.vue";


</script>

<template>
  <main class="">
    <Menu />
    <Cart />
    <div class="min-h-screen mt-5 bg-white ">
      <RouterView />
    </div>


  </main>

</template>

<style scoped></style>
