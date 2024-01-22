<script setup>
import { useCart } from "../stores/cart";
import { ref } from "vue";
import { onClickOutside } from '@vueuse/core';
import { ShoppingCartIcon, XMarkIcon } from '@heroicons/vue/24/solid';
const store = useCart()
const target = ref(null);
onClickOutside(target, (event) => store.modalCart = false)
</script>
<template>
    <main class="relative">
        <aside v-if="store.modalCart" ref="target"
            class="fixed right-0 flex flex-col p-8 items-center w-96 z-50 h-screen rounded-md border-l-2 bg-white shadow-xl">
            <XMarkIcon class="h-7 absolute top-3 left-3 cursor-pointer" @click="store.modalCart = false" />
            <h1 class="text-3xl font-bold uppercase text-gray-500 border-b-2 mb-10">Carrinho</h1>
            <div class=" max-h-[800px] overflow-auto p-2">

                <div class="w-full flex gap-5 mb-3 items-center border-2 p-1 rounded-md" v-for="(item, index) in store.cart"
                    :key="item._id">
                    <img class="h-20" :src="item.image_url" />
                    <h2 class="text-xs">{{ item.title }} - <span class="text-orange-600">{{ item.price }} R$</span></h2>
                    <h3 class="text-red-500 text-xs cursor-pointer hover:text-red-600" @click="store.removeItemCart(index)">
                        remover</h3>
                </div>
            </div>
            <h2 class="text-xl uppercase mp-2 border-b-2">Total:<span class="text-orange-700 font-bold text-2xl pl-1">{{
                store.total }}</span></h2>
            <button
                class="bg-orange-700 text-white font-bold uppercase px-4 py-2 flex items-center hover:bg-orange-500 rounded-md absolute bottom-9">
            <ShoppingCartIcon class="h-5 mr-3" /> Finalizar
        </button>

    </aside>
</main></template>