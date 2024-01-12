<script setup>
import { useProduct } from "../../stores/storeProducts";
import { onClickOutside } from '@vueuse/core'
import { ref, onMounted } from "vue";
import axios from "axios";
const store = useProduct();
const modalCategory = ref();
const modalMenu = ref();
const target = ref(null)
const targetMenu = ref(null)
const inputCategory = ref('');
const inputCategory2 = ref('')
const inputGenere = ref('')
const inputTitle = ref('');
const inputTitle2 = ref('')
const inputPrice =ref('');
const inputImage =ref('');
const inputDescription = ref('')

onClickOutside(target, event => modalCategory.value = false)

onClickOutside(targetMenu, event => modalMenu.value = false)

const categories = [
    {
        title: "Vestuario Masculino",
        category: "clothing",
        gender: "male"
    },
    {
        title: "Vestuario Feminino",
        category: "clothing",
        gender: "female"
    },
    {
        title: "Joias",
        category: "jewelery",
    }


]
function selectedCategory(categoryApi, category, genere) {
    modalCategory.value = false;
    inputCategory2.value = categoryApi,
    inputCategory.value = category;
    inputGenere.value = genere

}
 async function pushItems(){
    
    const items = 
        {
        category:inputCategory2.value,    
        genere:inputGenere.value || 'Nao possui',
        title:inputTitle2.value,
        image_url:inputImage.value,
        price:inputPrice.value,
        description:inputDescription.value,
        }
     await store.postProduct(items);
     inputCategory.value = ''
     inputTitle2.value = '';
     inputImage.value = '',
     inputPrice.value = '',
     inputDescription.value = ''
     modalMenu.value = false
}

onMounted(async () => {
    store.getApi();

});
</script>

<template>
    <section>


        <main class=" container border-2 m-auto mt-5 mb-5 justify-center items-center  rounded-md shadow-lg">
            <h1 class="m-auto text-7xl mb-10 mt-5 text-center text-gray-500 font-bold">Painel Adm</h1>
            <div class="relative overflow-x-auto overflow-y-auto  ">
                <button class="p-2 rounded-md bg-green-400 w-32 text-white font-bold text-center block float-right m-6 "
                    @click="modalMenu = !modalMenu">Adicionar</button>

                <div class=" w-full h-full  flex justify-center  " ref="targetMenu" v-if="modalMenu">
                    <div class="  w-[600px]  p-8 fixed bg-gray-300 justify-center   m-auto rounded-lg shadow-lg">
                    
                        <div class="flex flex-col border-2 absolute w-44 p-2   float-left bg-white rounded-md">
                                <span class="text-gray-600 font-semibold text-[10px]">Categoria/Genero</span>
                                <h1 class="font-bold text-gray-800 text-center cursor-pointer" ref="target"
                                    @click="modalCategory = !modalCategory"
                                    v-if="!inputCategory ? inputCategory = 'Selecione' : inputCategory">{{ inputCategory
                                    }}</h1>
                                <li v-for="item in categories" :key="item.title" class=" border-b-2 mt-4 list-none"
                                    v-if="modalCategory">
                                    <h2 @click="selectedCategory( item.category , item.title, item.gender)"
                                        class="cursor-pointer font-bold text-gray-500">{{ item.title }}</h2>
                                </li>
                            </div>
                        <div class="flex flex-col  mt-20  gap-4">
                            <div class="flex flex-col border-2   p-2 bg-white rounded-md">
                                <span class="text-gray-600 font-semibold text-[10px]">Titulo</span>
                                <input type="text" class="p-2 rounded-md mt-2 bg-gray-100 outline-none" v-model="inputTitle2" required placeholder="Titulo" />
                            </div>
                            <div class="flex flex-col border-2   p-2 bg-white rounded-md">
                                <span class="text-gray-600 font-semibold text-[10px]">Imagem</span>
                                <input type="text" class="p-2 rounded-md mt-2 bg-gray-100 outline-none" v-model="inputImage" required placeholder="Url" />
                            </div>
                            <div class="flex flex-col border-2 w-44   p-2 bg-white rounded-md">
                                <span class="text-gray-600 font-semibold text-[10px]">Preço</span>
                                <input type="text" class="p-2 w-36 rounded-md mt-2 bg-gray-100 outline-none" v-model="inputPrice" required placeholder="Preço" />
                            </div>
                            <div class="flex flex-col border-2    p-2 bg-white rounded-md">
                                <span class="text-gray-600 font-semibold text-[10px]">Descrição</span>
                                <textarea type="text" class="p-2 resize-none rounded-md mt-2 bg-gray-100 outline-none" v-model="inputDescription" required placeholder="Descrição do produto" />
                            </div>
                           
                        </div>

                      <div class="gap-8 flex w-full justify-end mt-5">
                        <button class="font-bold p-2 rounded-md bg-red-400 text-white hover:bg-red-500">Cancelar</button>
                        <button class="font-bold p-2 rounded-md bg-green-400 text-white hover:bg-green-500" @click="pushItems">Cadastrar</button>
                      </div>
                    </div>

                </div>
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Produto
                            </th>
                           
                            <th scope="col" class="px-6 py-3">
                                imagem
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Preço
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Descrição
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            v-for=" item in store.responseUrl " :key="item.id">
                            <td class="px-6 py-4">
                                {{ item.title }}
                            </td>
                         
                            <td class="px-6 py-4">
                                <img class="h-10 w-10 " :src="item.image_url" />
                            </td>
                            <td class="px-6 py-4">
                                {{ item.price }}
                            </td>
                            <td class="px-6 py-4 w-96">
                                {{ item.description }}
                            </td>
                            <td class="px-6 py-4 w-96">
                                <button
                                    class="mr-4 font-bold p-2 rounded-md bg-orange-300 text-white hover:bg-orange-400">Editar</button>
                                <button
                                    class="mr-4 font-bold p-2 rounded-md bg-red-400 text-white hover:bg-red-500" @click="store.deleteProduct(item._id)">Apagar</button>
                            </td>



                        </tr>

                </tbody>
            </table>
        </div>

    </main>
</section></template>