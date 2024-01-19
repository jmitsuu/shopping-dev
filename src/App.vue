<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Menu from './components/Menu.vue';
import Footer from './components/Footer.vue';
import ModalUser from "./components/ModalUser.vue";
import Cart from "./components/Cart.vue";


</script>

<template>
  <main class="">

    <Cart />
  <Menu />
 
  <div class="min-h-screen bg-white ">
  
    <ModalUser />
    <RouterView />
  </div>

  <Footer />
</main>
</template>

<style scoped></style>
