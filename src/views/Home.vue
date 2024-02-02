<script setup>
import Products from "../components/Products.vue";
import { ref, onMounted } from "vue";
import layout from "../components/layout.vue";
import bg1 from "../assets/images/b1.jpg";
import bg2 from "../assets/images/b2.jpg";
import bg3 from "../assets/images/b3.jpg";
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
const slides = [bg1, bg2, bg3];

onMounted(async () => {
  store.getApi();
});
</script>

<template>
  <carousel
    :items-to-show="1"
    :transition="900"
    :autoplay="3000"
    :wrapAround="true"
    class=" m-auto pt-20  container  "
  >
    <slide v-for="slide in slides" :key="slide">
   
        <img class=" xl:h-[500px] md:h-[300px] w-full object-cover
         h-[300px]  " :src="slide" />
   
    </slide>
  </carousel>

  <div
    class=" flex justify-center  md:container md:p-0 mt-5  p-4 m-auto"
  >
  <div class="
  rounded-md
  mx-auto p-3 text-white justify-center xl:gap-36 md:items-center flex md:flex-row flex-col  w-full bg-black/80
  ">


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
</template>
../helpers/getApi
