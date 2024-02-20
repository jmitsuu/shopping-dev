<script setup>
import { RouterLink, RouterView } from "vue-router";
import Menu from "./components/Menu.vue";
import Footer from "./components/Footer.vue";
import Instagram from "./components/icons/Instagram.vue";
import Facebook from "./components/icons/Facebook.vue";
import Linkedin from "./components/icons/Linkedin.vue";
import Cart from "./components/Cart.vue";
</script>

<template>
  <main class="">
    <Menu />
    <Cart />

    <div class="min-h-screen z-50">
      <div
        class="h-7 w-full flex justify-end items-center bg-gradient-to-r from-black via-black z-50"
      >
        <div class="flex mr-56 gap-3">
          <Instagram
            :link="'http://instagram.com.br'"
            :style="'h-6 w-6 text-white'"
          />
          <Facebook
            :link="'http://facebook.com.br'"
            :style="'h-6 w-6 text-white'"
          />
          <Linkedin
            :link="'http://facebook.com.br'"
            :style="'h-6 w-6 text-white'"
          />
        </div>
      </div>
      <RouterView class="" />
    </div>
  </main>
</template>

<style scoped></style>
