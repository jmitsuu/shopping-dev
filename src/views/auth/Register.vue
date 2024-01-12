<script setup>
import {ref} from "vue";
import { EyeIcon} from '@heroicons/vue/24/solid'
const showpassord = ref(false);
function register(){

}

</script>
<template>
  <main class="container m-auto flex  p-4 gap-10 pt-20 relative">
    <Alert v-if="alertFields" :message="'Preencha todos os campos'" />
    <div class="p-2 w-full flex flex-col items-center justify-center gap-4">
      <form
        class="flex flex-col p-4 h-full md:w-[500px] w-[300px] border-b-2"
        @submit.prevent="register"
      >
        <h1 class="font-bold uppercase text-gray-800 text-4xl md:text-5xl mb-5 text-right block">
          <span
            class="border-b-4 border-red-400  h-2 font-extrabold text-gray-900"
            >Registrar</span
          >
        </h1>
        <label class="text-gray-400 uppercase text-lg font-bold mt-8"
          >e-mail</label
        >
        <input
          type="email"
          class="border-b outline-none md:w-96 text-red-600 mt-4 pb-2"
          placeholder="Seu e-mail"
          v-model="userEmail"
        />
        <label class="text-gray-400 uppercase text-lg font-bold mt-8"
          >Senha</label
        >
        <div class="relative md:w-96">
          <input
            :type="!showpassord ? 'password' : ' text'"
            class="border-b outline-none  md:w-96 text-red-600 mt-4 pb-2"
            placeholder="Sua Senha"
            v-model="userPassword"
          />
          <EyeIcon
            @click="showpassord = !showpassord"
            class="h-4 cursor-pointer absolute right-3 bottom-3"
          />
        </div>
        <label class="text-gray-400 uppercase text-lg font-bold mt-8"
          >Confirme sua senha</label
        >
        <div class="relative md:w-96">
          <input
            :type="!showpassord ? 'password' : ' text'"
            class="border-b outline-none  md:w-96 text-red-600 mt-4 pb-2"
            placeholder="Confirme sua senha"
            v-model="userPassword"
          />
          <EyeIcon
            @click="showpassord = !showpassord"
            class="h-4 cursor-pointer absolute right-3 bottom-3"
          />
        </div>
        

        <div class="items-center">
          <button
            class="px-3 py-2 text-white bg-red-500 font-bold w-28 rounded-md mt-8 uppercase hover:bg-red-600"
          >
            Registrar
          </button>
        
        </div>
      </form>
      <span class="text-gray-700 text-xl">{{ userMessage }}</span>
      <RouterLink to="/auth/acesso">
        <button
          class="text-gray-600 text uppercase font-bold text-2xl mt-5 hover:border-b-2 hover:text-gray-800"
        >
         Voltar
        </button>
      </RouterLink>
    </div>
  </main>
</template>