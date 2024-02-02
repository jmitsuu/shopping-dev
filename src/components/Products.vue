<script setup>
import { ref, computed, onMounted } from "vue";
import { useProduct } from "../stores/storeProducts";
import { useRouter } from "vue-router";
import * as I from '@heroicons/vue/24/outline';
import { useCart } from "../stores/cart";
import Sucess from "../components/notifications/Sucess.vue";
import instance from "../http/getUrl";
const storeCart = useCart()
const store = useProduct();
const router = useRouter();
const totalAval = ref();
const totalSoma = ref(0)
const props = defineProps({
  title: String,
  price: Number,
  img: String,
  description: String,
  count: Number,
  rate: Number,
  items: String,
  id: Number,
  idPro: Number
});
const goToDescriptions = (id) => {
  router.push({ name: 'descricao', params: { id } })
}

async function getComments() {
  const { data } = await instance.get(`comments/${props.idPro}`);
const total = data.map(el => el.voto.toFixed(0));
totalAval.value = total.length
for(let i = 0; i < total.length; i++){
  
  totalSoma.value += total[i]/total.length



}
 



}

onMounted(() => {
  getComments()
})
</script>
<template>
  <div v-if="store.skeletonLoad" class=" md:h-[400px] md:w-[350px] flex justify-center items-center border-2 bg-gray-200 rounded-md animate-pulse">
    <span class="text-gray-800 text-2xl"> </span>
  </div>

  <div v-else
    class="flex md:h-[400px] md:w-[350px] h-full border-[0.1em] relative hover:shadow-md px-1 transition duration-300 bg-[#F6F6F6]  text-center flex-col cursor-pointer"
    >

    <img :src="props.img" class="rounded-lg mx-auto md:h-full h-[200px]  w-full  sm:w-[210px] transition-all"  @click="goToDescriptions(id)"/>
    <div class="flex flex-col items-center ">
      <p class="text-gray-600 text-xs xl:text-[1.0rem]">
        {{ props.description }}
      </p>
      <p class="text-gray-900 font-bold text-[1.3rem]">
        <span class="font-normal text-[1.0rem]" v-if="props.rate">Nota</span>
        {{ rate }}
      </p>
    </div>

    <div class="mt-8 text-left">
      <p class="text-slate-500 font-semibold text-semibold text-[0.9rem]">
        {{ props.title }}
      </p>
      <div class="flex items-center gap-1 text-yellow-500 text-xs font-bold">
        {{ totalSoma.toFixed(0) }}/5<I.StarIcon   class="h-4  " /> ({{ totalAval }})
       
      </div>
      <p class="text-red-500 text-[1.2rem] text-bold mt-3">
        <span class="border-t-2 border-orange-600 font-bold">
          {{ props.price }} R$</span>
      </p>
    </div>
    <div class="p-3 rounded-full bg-white shadow-md absolute right-2 bottom-1 flex justify-center items-center">
      <I.ShoppingCartIcon class="h-6 hover:text-orange-700" @click="storeCart.incrementCart(items)"/>
    </div>
  </div>
</template>
