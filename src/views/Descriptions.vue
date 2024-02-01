<script setup>
import { useProduct } from "../stores/storeProducts";
import {
  StarIcon,
  Square3Stack3DIcon,
  ShoppingCartIcon,
} from "@heroicons/vue/24/solid";
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import instance from "../http/getUrl";
const store = useProduct();
const route = useRoute();
const modal = ref(false);
const qtd = ref(1);
const inputCep = ref("88113500");
const dataLocal = ref();
const priceSplit = ref();
const comments = ref();
const voteUser = ref();
const inputVote = ref();
const inputComment = ref();
const modalComments = ref();
// async function getCep() {
//   const { data } = await axios.get(
//     `https://viacep.com.br/ws/${inputCep.value.trim().replace("-", "")}/json/`
//   );
//   dataLocal.value = data;
//   modal.value = false;
// }
// getCep();

const selectedProduct = computed(() => {
  if (!store.responseUrl) {
    store.getApi();
  }

  return store.responseUrl.find((item) => item._id === Number(route.params.id));
});
async function getComments() {
  const { data } = await instance(`comments/${route.params.id}`);
  comments.value = data || null;
  comments.value.forEach((el) => {
    voteUser.value = el.voto;
  });
}
async function insertComment() {
  const body = {
    voto: Number(inputVote.value),
    id_produto: Number(route.params.id),
    id_usuario: store.credentials.id,
    comentario: inputComment.value,
  };
  try {
    const { data } = await instance.post(`comments/`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: store.credentials.tokenLocal,
      },
    });

    if (data) {
      console.log(data);
      modalComments.value = false;
      getComments();
    }
  } catch (error) {}
}
onMounted(async () => {
  getComments();
});
</script>

<template>
  <section
    class="min-h-screen py-10 flex flex-col justify-center items-center bg-slate-50"
  >
    <div class="mx-auto container border-[0.1rem] rounded-md p-3 bg-white">
      <h1 class="text-center text-5xl font-bold text-gray-700 uppercase m-5">
        Produto
      </h1>
      <div
        class="xl:w-2/4 mx-auto justify-center items-center border-[0.1rem] flx xl:flex rounded-md mt-4 xl:pl-10 xl:pt-9 p-4"
      >
        <img :src="selectedProduct.image_url" class="h-full mx-auto w-56" />
        <div class="xl:ml-10 w-full">
          <h1 class="text-gray-700 xl:text-[1.8rem] text-center font-semibold">
            {{ selectedProduct.title }}
          </h1>

          <h1 class="mt-4 text-[2.5rem] font-bold text-red-800">
            {{ selectedProduct.price }} R$
          </h1>
          <div>
            <h1 v-if="(priceSplit = selectedProduct.price / 8)">
              8x de
              <span class="text-red-700 font-semibold">{{
                priceSplit.toFixed(2)
              }}</span>
              sem juros no cartão
            </h1>
          </div>
          <div class="flex gap-8 text-sm mt-6 text-gray-700">
            <h1>Frete</h1>
            <div class="relative h-full">
              <p>Frete para:</p>
              <p
                @click="modal = !modal"
                class="bg-gray-50 flex p-3 cursor-pointer border-2"
              >
                <Square3Stack3DIcon class="h-5 mr-4" />
                <span>
                  <!-- {{ dataLocal.uf }}, {{ dataLocal.localidade }},
                  {{ dataLocal.logradouro }} -->
                </span>
              </p>
              <div
                v-if="modal"
                class="absolute xl:flex gap-3 bg-gray-300 rounded-sm p-5"
              >
                <input
                  placeholder="Digete um Cep"
                  class="w-32 py-4 pl-2 rounded-sm outline-none"
                  v-model="inputCep"
                  required
                />
                <button
                  class="p-3 rounded-md mt-2 md:mt-0 bg-red-200 text-gray-700 font-bold hover:bg-red-300"
                  @click="getCep"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
          <div class="flex mt-10 text-sm text-gray-700">
            <h1>Quantidade</h1>
            <input type="number" v-model="qtd" class="ml-10 w-10" />
          </div>
          <div class="mt-10 gap-3 flex items-center justify-center text-xs">
            <button
              class="px-2 py-3 flex bg-red-100 text-red-800 transition-all hover:bg-red-300 rounded-md"
            >
              <ShoppingCartIcon class="h-5 mr-3" />
              Adicionar ao Carrinho
            </button>
            <button
              class="px-2 py-3 bg-red-300 text-gray-700 transition-all hover:bg-red-500 rounded-md"
            >
              Comprar Agora
            </button>
          </div>
        </div>
      </div>
      <div
        class="xl:w-2/4 mx-auto xl:min-h-[300px] mt-6 bg-white border-t-[0.1rem] xl:pl-10 xl:pt-9 p-4"
      >
        <h1 class="text-gray-600 text-[1.4rem] p-3 w-full bg-slate-100 h-full">
          Descrição do Produto
        </h1>
        <p class="text-[0.9rem] mt-10">{{ selectedProduct.description }}</p>
      </div>
      <div class="mx-auto xl:w-2/4 border-t-[0.1rem] p-3 bg-white">
        <div class="mt-10">
          <h1 class="uppercase font-bold text-gray-800">
            <span class="border-b-2 pb-2">Avaliações</span>
          </h1>

          <div class="mt-10">
            <h1
              class="uppercase font-bold text-gray-800 border-b-2 pb-5 text-[1.3rem]"
            >
              Avaliações mais recentes
            </h1>
            <div class="border-b-2 h-[260px] p-4 overflow-auto">

          
            <div
              class="flex flex-col overflow-auto border-black mt-6 gap-10"
              v-for="comment in comments"
              :key="comment.id_comentario"
            >
              <div class="flex gap-10 border-b-2 pb-4">
                <div class="">
                  <h1 class="text-gray-400 text-md w-32 font-bold">
                    {{ comment.name }}
                  </h1>
                  <p class="text-gray-300 font-semibold text-xs">
                    {{ comment.data_insercao.slice(0, -9) }}
                  </p>
                </div>
                <div class="w-full">
                  <div class="flex">
                    <div
                      class="flex"
                      v-for="stars of comment.voto"
                      :key="stars"
                    >
                      <div><StarIcon class="h-3 w-3 text-yellow-600" /></div>
                    </div>
                  </div>
                  <p class="mt-4 text-xs">{{ comment.comentario }}</p>
                </div>
              </div>
            </div>
          </div>
            <div class="flex flex-col mt-10">
              <RouterLink
                to="/auth/acesso"
                class="m-auto mt-4"
                v-if="!store.token"
                >Deseja avalir esse produto?</RouterLink
              >
              <button
                v-else
                class="text-xl font-bold uppercase p-2 mt-4 bg-black text-white max-w-96 m-auto hover:bg-black/60"
                @click="modalComments = !modalComments"
              >
                Quero Avaliar esse produto
              </button>
              <div
                v-if="modalComments"
                class="h-full w-full mt-2  xl:p-4 rounded-md border-[0.1rem]"
              >
                <div class="flex p-2 gap-2">
                  <div
                    class="flex cursor-pointer bg-black p-2 rounded-md hover:bg-black/60"
                    @click="inputVote = '5'"
                  >
                    <StarIcon
                      class="h-3 w-3 text-yellow-600"
                      v-for="stars of 5"
                      :key="stars"
                    />
                  </div>
                  <div
                    class="flex cursor-pointer bg-black p-2 rounded-md hover:bg-black/60"
                    @click="inputVote = '4'"
                  >
                    <StarIcon
                      class="h-3 w-3 text-yellow-600"
                      v-for="stars of 4"
                      :key="stars"
                    />
                  </div>
                  <div
                    class="flex cursor-pointer bg-black p-2 rounded-md hover:bg-black/60"
                    @click="inputVote = ' 3'"
                  >
                    <StarIcon
                      class="h-3 w-3 text-yellow-600"
                      v-for="stars of 3"
                      :key="stars"
                    />
                  </div>
                  <div
                    class="flex cursor-pointer bg-black p-2 rounded-md hover:bg-black/60"
                    @click="inputVote = '2'"
                  >
                    <StarIcon
                      class="h-3 w-3 text-yellow-600"
                      v-for="stars of 2"
                      :key="stars"
                    />
                  </div>
                  <div
                    class="flex cursor-pointer bg-black p-2 rounded-md hover:bg-black/60"
                    @click="inputVote = '1'"
                  >
                    <StarIcon
                      class="h-3 w-3 text-yellow-600"
                      v-for="stars of 1"
                      :key="stars"
                    />
                  </div>
                </div>
                <h3 class="text-xs" v-if="inputVote">
                  Seu voto: {{ inputVote }}
                </h3>

                <div>
                  <div class="flex flex-col mt-5">
                    <label class="text-slate-400">Comentario</label>
                    <textarea
                      class="resize-none h-24 mt-2 border-[0.1rem] outline-none cursor-text text-left p-2"
                      v-model="inputComment"
                    >
                    </textarea>
                  </div>
                </div>
                <button
                  class="bg-black/30 text-gray-200 py-2 px-4 mt-4 float-right hover:bg-black"
                  @click="insertComment"
                >
                  Enviar avaliação
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style></style>
