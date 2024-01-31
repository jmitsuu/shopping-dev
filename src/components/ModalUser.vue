<script setup>
import { ref, computed } from "vue"
import { useScroll } from '@vueuse/core';
import { ShoppingCartIcon, UserIcon } from '@heroicons/vue/24/solid';
import { name } from "../helpers/credentials";
import { useCart } from "../stores/cart"
import  Sucess from "../components/notifications/Sucess.vue"
const store = useCart()
const scroll = ref(false);
// const name = ref('')
function handleScroll() {
    if (window.scrollY >= 50) {
        scroll.value = true;
    } else {
        scroll.value = false
    }
    if (window.scrollY >= 2047) {
        scroll.value = false
    }
}

window.addEventListener('scroll', handleScroll)
</script>
<template>
    <main class="relative flex justify-center items-center">
      
        <Transition>
        
            <div v-if="scroll"
                class="fixed z-50  bottom-8 h-20 w-[600px] justify-center gap-10 p-4 items-center flex  rounded-md border-2 bg-[#F8F8FF] shadow-xl">
                <Transition>
                  
                </Transition>
              
                <h2 class="left-8 absolute"> {{ name }}</h2>
                <UserIcon class="h-6 cursor-pointer text-orange-600 hover:text-orange-200" />
                <div class="flex relative ">
                    <ShoppingCartIcon @click="store.modalCart = !store.modalCart"
                        class="h-6 cursor-pointer text-orange-600 hover:text-orange-200" />
                    <span class="absolute bottom-4 right-0 text-xs">{{ store.countCart }}</span>
                </div>

            </div>
        </Transition>
    </main>
</template>
<style>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>