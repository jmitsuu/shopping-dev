<script setup>
import {useCart} from "../stores/cart";
import {ref} from "vue";
import { onClickOutside } from '@vueuse/core';
const store = useCart()
const target = ref(null);
onClickOutside(target, (event) => store.modalCart = false)
</script>
<template>
    <main class="relative">
        <aside v-if="store.modalCart" ref="target" class="fixed right-0 flex flex-col p-8 items-center w-80 z-50 h-screen rounded-md border-l-2 bg-[#F8F8FF] shadow-xl">
            <h1 class="text-3xl font-bold uppercase text-gray-500 border-b-2">Carrinho</h1>
           <div>
    
            <div class="w-full">
                baaaaaaaaaaaaaaaaaaaaaaaaaaaaaaag
            </div>
           </div>

        </aside>
    </main>
</template>