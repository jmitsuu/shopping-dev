<script setup>

import { RouterLink, RouterView } from 'vue-router'
import { UserIcon, ChevronUpIcon, ChevronDownIcon, Bars4Icon } from '@heroicons/vue/24/solid'
import { ref, onMounted } from "vue";
import { onClickOutside } from '@vueuse/core';
import instance from '../http/getUrl';
import { useProduct } from '../stores/storeProducts';
const modal = ref(false);
const target = ref(null);
const targetMenu =ref(null)
const name = ref('');
const logged = ref();
const acessLevel =ref();
const modalBar = ref(false)
onClickOutside(target, (event) => modal.value = false)
onClickOutside(targetMenu, (event) => modalBar.value = false)
if(window.location.reload){
  modal.value = false
}
async function getCredentials() {
 const getUserLocal =  localStorage.getItem('credentials');
 const userToJson = JSON.parse(getUserLocal)
 if(!userToJson) return;
 name.value = userToJson.userName;
 logged.value = userToJson.verifyUser;
 const {data} = await instance.get('/admin',{
  headers:{
    'authorization': userToJson.tokenLocal
  }
 });

const acess = data.find(i => i.acess_level);

 if(acess.acess_level === 3)
 acessLevel.value = true;

}

async function logout(){
 await instance.post('/logout');
 setTimeout(() => {
  window.location.reload()
 }, 300);
 localStorage.clear('credentials')
}

onMounted(()=>{
  getCredentials()
})

</script>
<template>
   <header class="w-full h-20  z-50 border-b-2">
    <div class="xl:flex w-full h-full justify-center items-center" >
    <h2 v-if="name">     Olá, {{ name }} </h2>
    <div>
      <Bars4Icon class="h-10 absolute xl:hidden" @click="modalBar = !modalBar" />
    </div>
      <nav class=" hidden xl:flex relative w-full container h-full  text-slate-800   justify-center items-center gap-5 ">
        <RouterLink class="" to="/">Home</RouterLink>
        <div class="relative flex items-center gap-1">
          <ChevronUpIcon v-if="!modal" class="h-4" />
            <ChevronDownIcon v-if="modal" class="h-4" />
          <h1 @click="modal = !modal" class="cursor-pointer flex items-center gap-1" @mouseover="modal = true">Vestuário
        
          </h1>
          <div ref="target" v-if="modal" @mouseleave="modal = false"
            class="absolute top-8 gap-3 text-slate-800 flex flex-col z-50 bg-white border-2 rounded-md py-2 px-4">
            <RouterLink :to="{path:'/clothes', query:{gender:'male'}}" @click="modal = false">Masculino</RouterLink>
            <RouterLink :to="{path:'/clothes', query:{gender:'female'}}"  @click="modal = false">Feminino</RouterLink>
          </div>
        </div>
        <RouterLink to="/">Sobre nós</RouterLink>
        <RouterLink to="/administrador" class="text-red-800 hover:text-red-500 font-bold" v-if="acessLevel"  >Administrador</RouterLink>
        <RouterLink to="/auth/acesso/" class="right-28 absolute flex items-center" v-if="!logged" >
          <UserIcon class="h-4 mr-3 text-sm" /> Entre ou Cadastre-se
        </RouterLink>
        <RouterLink to="/" class="right-28 absolute flex items-center" @click="logout"  v-else>
          <UserIcon class="h-4 mr-3 text-sm" /> Sair
        </RouterLink>
      </nav>
      <nav 
      ref="targetMenu"
      v-if="modalBar"
      class="xl:hidden flex-col flex p-6 xl:p-0 absolute m-4 mt-3 ml-10  bg-black/80 xl:bg-white rounded-md  text-slate-200 w-40 text-xs z-50  xl:w-full container   xl:text-slate-800 justify-between    gap-5 xl:text-[0.8rem]">
        <RouterLink class="" to="/">Home</RouterLink>
        <div class="relative flex">
          <ChevronUpIcon v-if="!modal" class="h-4" />
            <ChevronDownIcon v-if="modal" class="h-4" />
          <h1 @click="modal = !modal" class="cursor-pointer flex items-center gap-1" @mouseover="modal = true">Vestuário
          
          </h1>
          <div ref="target" v-if="modal" @mouseleave="modal = false"
            class="absolute bg-white border-2 top-5  gap-3 text-slate-800 flex flex-col z-50  rounded-md py-2 px-4">

            <RouterLink to="/vestuario/masculino" @click="modal = false">Masculino</RouterLink>
            <RouterLink to="/vestuario/feminino" @click="modal = false">Feminino</RouterLink>

          </div>
        </div>
        <RouterLink to="/">Sobre nós</RouterLink>
        
        <RouterLink to="/administrador" class="text-red-800 hover:text-red-500 font-bold" v-if="acessLevel"  >Administrador</RouterLink>
        <RouterLink to="/auth/acesso/" class="right-28 xl:absolute flex items-center" v-if="!logged" >
          <UserIcon class="h-4 xl:mr-3 text-sm" /> Acessar conta
        </RouterLink>
        <RouterLink to="/" class="right-28 xl:absolute flex items-center" @click="logout"  v-else>
          <UserIcon class="h-4 mr-3 text-sm" /> Sair
        </RouterLink>
      </nav>

    </div>

  </header>
</template>