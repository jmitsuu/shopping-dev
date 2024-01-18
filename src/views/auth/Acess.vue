<script setup>
import {ref} from "vue";
import { EyeIcon} from '@heroicons/vue/24/solid'
const showpassord = ref(false);

</script>
<template>
    <main class="container m-auto h-screen p-4 gap-10    pt-20">


        <form class="flex flex-col  p-4 w-[600px]  ">
            <h1 class=" font-bold uppercase text-gray-800 text-6xl text-right block ">
                <span class="border-b-4 border-red-400 w-15 h-2 font-extrabold text-gray-900">Login</span>
            </h1>
            <label class="text-gray-400 uppercase text-lg font-bold mt-8">Usuario</label>
            <input type="email" class="border-b outline-none w-96  text-red-600 mt-4 pb-2" placeholder="SEU E-MAIL" />
            <label class="text-gray-400 uppercase text-lg font-bold mt-8">Senha</label>
            <div class="relative w-96">
                <input  :type="!showpassord? 'password' : ' text'" class="border-b outline-none w-96  text-red-600 mt-4 pb-2 " placeholder="SUA SENHA " />
                <EyeIcon @click="showpassord = !showpassord" class="h-4 cursor-pointer absolute right-3 bottom-3" />
            </div>
         
            <div class="  h-12 items-center">
                <button
                    class="px-3 py-2 text-white bg-red-500 font-bold w-28 rounded-md mt-8 uppercase hover:bg-red-600">Entrar</button>
                <p class=" font-bold mt-6"><span class="border-b-2 border-red-400 text-red-500 text-center cursor-pointer" >Esqueceu seu
                        login?</span></p>
            </div>

        </form>
      



    </main>
</template>