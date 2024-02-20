<script setup>
import Products from "../components/Products.vue";
import { ref, onMounted } from "vue";
import layout from "../components/layout.vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel";
import {
  TruckIcon,
  CreditCardIcon,
  ShoppingBagIcon,
  CheckBadgeIcon,
} from "@heroicons/vue/24/solid";

import { useProduct } from "../stores/storeProducts";
const store = useProduct();
const slides = [
  {
    img: "https://jairo3478.c35.integrator.host/images/bg/b1.jpg",
    title: "Estilo para o ano todo",
    text: "Encontre a sua melhor versão.",
  },
  {
    img: "https://jairo3478.c35.integrator.host/images/bg/b2.jpg",
    title: "Surpreenda",
    text: "Presenteie a pessoa que está ao seu lado.",
  },
  {
    img: "https://jairo3478.c35.integrator.host/images/bg/b3.jpg",
    title: "Moda para todos os gostos",
    text: "Confira os produtos com a melhor qualidade do mercado.",
  },
];

onMounted(async () => {
  store.getApi();
});
</script>

<template>
  <main class="">
    <carousel
      :items-to-show="1"
      :transition="10000"
      :autoplay="3000"
      :wrapAround="true"
      class="m-auto relative"
    >
      <slide v-for="slide in slides" :key="slide" class="">
        <div class="w-full h-full relative flex 0 z-50 backdrop-opacity-10">
          <img
            class="xl:h-[600px] md:h-[300px] w-full contrast-125 object-cover h-[300px]"
            :src="slide.img"
          />
          <div
            class="absolute z-50 bg-gradient-to-tr from-black/90 h-full w-full backdrop-blur-sm"
          >
            <div class="right-4 top-16 absolute text-left">
              <h1
                class="text-slate-200 border-b-2 xl:text-8xl text-4xl font-bold uppercase"
              >
                {{ slide.title }}
              </h1>
              <p class="font-semibold text-3xl text-slate-300 mt-5">
                {{ slide.text }}
              </p>
            </div>
          </div>
        </div>
      </slide>
    </carousel>

    <div class="flex justify-center md:p-0 p-4 m-auto">
      <div
        class="mx-auto p-3 text-white justify-center xl:gap-36 md:items-center flex md:flex-row flex-col w-full bg-gradient-to-r bg-black"
      >
        <div class="flex md:justify-center items-center">
          <TruckIcon class="h-10 ml-2" />
          <div>
            <h1 class="font-bold">Frete Fixo*</h1>
            <p>Em todo Brasil</p>
          </div>
        </div>
        <div class="flex md:justify-center items-center">
          <CreditCardIcon class="h-10 ml-2" />
          <div>
            <h1 class="font-bold">Pagamento</h1>
            <p>de fatura</p>
          </div>
        </div>
        <div class="flex md:justify-center items-center">
          <ShoppingBagIcon class="h-10 ml-2" />
          <div>
            <h1 class="font-bold">Parcele em até 5x</h1>
            <p>sem juros*</p>
          </div>
        </div>
        <div class="flex md:justify-center items-center">
          <CheckBadgeIcon class="h-10 ml-2" />
          <div>
            <h1 class="font-bold">Desconto</h1>
            <p>de 10% na primeira compra</p>
          </div>
        </div>
      </div>
    </div>
    <layout>
      <template #prod>
        <div class="" v-for="item in store.responseUrl" :key="item._id">
          <Products
            :title="item.title"
            :items="item"
            :img="item.image_url"
            :price="item.price"
            :id="item._id"
            :idPro="item._id"
          />
        </div>
      </template>
    </layout>
  </main>
</template>
../helpers/getApi
