<script setup>

import { RouterLink, RouterView } from 'vue-router'
import * as I from '@heroicons/vue/24/solid';
import * as IL from '@heroicons/vue/24/outline';
import { ref, onMounted } from "vue";
import { onClickOutside } from '@vueuse/core';
import instance from '../http/getUrl';
import { useCart } from "../stores/cart"
import Sucess from "./notifications/Sucess.vue"
const modal1 = ref(false);
const modal2 = ref(false);
const target = ref(null);
const targetMenu = ref(null)
const name = ref('')
const logged = ref(false);
const acessLevel = ref();
const modalBar = ref(false);
const store = useCart();

onClickOutside(targetMenu, (event) => modalBar.value = false)
onClickOutside(target, (event) => modal2.value = false)

async function getCredentials() {

  const getUserLocal = localStorage.getItem('credentials');
  const userToJson = JSON.parse(getUserLocal)
  if (!userToJson) return;
  name.value = userToJson.userName;
  if (name.value) {
    logged.value = true
  }
if(userToJson){
  
}
  const { data } = await instance.get('/admin', {
    headers: {
      'authorization': userToJson.tokenLocal
    }
  });

  data.forEach(el => {
    if (el.token === userToJson.tokenLocal) {
      acessLevel.value = true;
    }
  })

  if (userToJson.tokenLocal) {
    setTimeout(() => {
      localStorage.clear('credentials');
      window.location.reload()
    }, 36000000);

  }
}

async function logout() {
  await instance.post('/logout');
  setTimeout(() => {
    window.location.reload()
  }, 300);
  localStorage.clear('credentials');

}

function closeModal(){
  modalBar.value = false,
  modal1.value = false
}
onMounted(() => {

  getCredentials()
})

</script>
<template>
  <header class="w-full h-20 fixed -mt-5 z-50  bg-black">
    <div class="xl:flex w-full h-full  justify-center items-center">
      <h2 v-if="name" class="hidden xl:block text-slate-300"> Olá, <span class="text-orange-600">{{ name }}</span> </h2>
      <div>
        <I.Bars4Icon class="h-10 mt-5 cursor-pointer absolute xl:hidden text-white"  @click="modalBar = !modalBar" />
      </div>
      <Sucess v-if="store.notification" :title="'Sucesso'" :message="'Produto adicionado ao carrinho'"
        class="fixed z-50 top-40 left-12 shadow-md  h-20 rounded-sm transition-all" />
      <nav class=" hidden xl:flex relative w-full container h-full  text-slate-300   justify-center items-center gap-5 ">
        <RouterLink class="" to="/">Home</RouterLink>
        <div class="relative flex items-center gap-1">
          <I.ChevronUpIcon v-if="!modal2" class="h-4" />
          <I.ChevronDownIcon v-if="modal2" class="h-4" />
          <h1 @click="modal2 = !modal2" class="cursor-pointer flex items-center gap-1" >Vestuário

          </h1>
          <div ref="target" v-if="modal2"
            class="absolute top-8 gap-3 text-slate-800 flex flex-col z-50 bg-white border-2 rounded-md py-2 px-4">
            <RouterLink :to="{ path: '/clothes', query: { gender: 'male' } }" @click="modal2 = false">Masculino
            </RouterLink>
            <RouterLink :to="{ path: '/clothes', query: { gender: 'female' } }" @click="modal2 = false">Feminino
            </RouterLink>
          </div>
        </div>
        <RouterLink to="/">Sobre nós</RouterLink>
        <RouterLink to="/administrador" class="text-red-800 hover:text-red-500 font-bold" v-if="acessLevel">Administrador
        </RouterLink>
        <div class="right-28 absolute gap-10  flex items-center ">
      <div class="relative">
        <I.ShoppingCartIcon @click="store.modalCart = !store.modalCart"
            class="h-6 cursor-pointer text-orange-600 z-50 hover:text-orange-200" />
          <span class="absolute bottom-4 right-0 text-xs text-slate-300 " v-if="store.countCart">{{ store.countCart }}</span>
      </div>
          <RouterLink to="/auth/acesso/" class="right-14 absolute flex items-center" v-if="!logged">
            <span class="text-sm w-36">Entre ou Cadastre-se</span>
            <I.UserIcon class="h-6 mr-1 text-sm text-orange-600" />
          </RouterLink>
          <RouterLink to="/" class="flex items-center" @click="logout" v-else>
            <I.UserIcon class="h-4 mr-3 text-sm text-orange-600" /> Sair
          </RouterLink>
        </div>

      </nav>
      <Transition>
      <nav ref="targetMenu" v-if="modalBar"
        class="xl:hidden flex-col  flex  xl:p-0 absolute  bg-white h-screen xl:bg-white rounded-md  font-semibold text-slate-700  text-2xl z-50 w-screen xl:w-full container   xl:text-slate-800    gap-5 xl:text-[0.8rem]">
        <div class="h-20 w-full flex justify-between items-center bg-black">
          <h1 class="font-semibold text-gray-100 text-center border-b-2 ml-4">Shopping <span class="text-orange-700">Oriaj</span></h1>
           <IL.XCircleIcon class="text-white h-8 mr-4 cursor-pointer" @click="modalBar =false" />
        </div>
        <div class="gap-10 flex flex-col  p-2 m-2">
          <div>
            <h1 v-if="name">Ola, <span class="text-orange-700 text-sm">{{ name }}</span></h1>
          </div>
    
        <RouterLink class="" to="/" @click="closeModal">Home</RouterLink>
        <div class="relative  w-full  cursor-pointer " >
         <div  @click="modal1 = !modal1">

      
          <h1  class="cursor-pointer flex  gap-1 " >Vestuário
            <I.ChevronUpIcon v-if="!modal1" class="h-4 absolute top-2 right-4 qq" />
          <I.ChevronDownIcon v-else class="h-4  absolute top-2 right-4" />
          

          </h1>
        </div>
          <div ref="target" v-if="modal1"
            class=" bg-white  top-9  gap-3 mt-2 items-center justify-center text-slate-800 flex flex-col z-50  rounded-md py-2 px-4">

            <RouterLink :to="{ path: '/clothes', query: { gender: 'male' } }" @click="closeModal">Masculino
            </RouterLink>
            <RouterLink :to="{ path: '/clothes', query: { gender: 'female' } }" @click="closeModal">Feminino
            </RouterLink>

          </div>
        
        </div>
        <RouterLink to="/">Sobre nós</RouterLink>

        <RouterLink to="/administrador" class="text-red-800 hover:text-red-500 font-bold" @click="closeModal" v-if="acessLevel">Administrador
        </RouterLink>

        <RouterLink to="/auth/acesso/" class="right-28 xl:absolute flex items-center" @click="closeModal" v-if="!logged">
           Acessar conta

        </RouterLink>
        <RouterLink to="/" class="right-28 xl:absolute flex items-center gap-4" @click="logout" v-else>
          Sair  
        </RouterLink>
      </div>
      </nav>
    </Transition>
    <div class="absolute right-5 top-8 xl:hidden md:block ">
    <I.ShoppingCartIcon @click="store.modalCart = !store.modalCart"
            class="h-6 cursor-pointer text-orange-600 z-50 hover:text-orange-200" />
          <span class="absolute bottom-4 right-0 text-xs text-gray-600"  v-if="store.countCart">{{ store.countCart }}</span>
  </div>
    </div>

  </header>
</template>
<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>