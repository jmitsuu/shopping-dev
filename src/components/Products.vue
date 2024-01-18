<script setup>
import { ref, computed } from "vue";
import { useProduct } from "../stores/storeProducts";
import { useRouter } from "vue-router";

const store = useProduct();
const router = useRouter()
const props = defineProps({
  title: String,
  price: Number,
  img: String,
  description: String,
  count: Number,
  rate: Number,
  item: String,
  id: Number,
});
const goToDescriptions = (id) => {
  router.push({ name: 'descricao', params: { id } })
}

</script>
<template>
  <div v-if="store.skeletonLoad"
    class=" flex justify-center items-center border-2 bg-gray-200 rounded-md animate-pulse">
    <span class="text-gray-800 text-2xl"> </span>
  </div>

  <div v-else @click="goToDescriptions(id)"
    class="flex h-[400px] cursor-pointer border-[0.1em] hover:shadow-md transition duration-300 p-4 rounded-md text-center flex-col">
    <img :src="props.img" class="rounded-lg mx-auto h-full" />
    <div class="flex flex-col items-center">
      <p class="text-gray-600 text-xs xl:text-[1.0rem]">
        {{ props.description }}
      </p>
      <p class="text-gray-900 font-bold text-[1.3rem]">
        <span class="font-normal text-[1.0rem]" v-if="props.rate">Nota</span>
        {{ rate }}
      </p>
    </div>

    <div class="mt-8">
      <p class="text-slate-500 font-semibold text-semibold text-center text-[0.9rem]">
        {{ props.title }}
      </p>
      <p class="text-orange-500 text-[1.2rem] text-bold mt-3">
        <span class="border-t-2 border-orange-600">
          {{ props.price }} R$</span>
      </p>
    </div>
  </div>
</template>
