<script setup>
import { ref, onMounted } from "vue";
import Products from "../../components/Products.vue";
import layout from "../../components/layout.vue";
import Scope from "../../components/Scope.vue";
import { textMasculine } from "../../helpers/message";
import { useProduct } from "../../stores/storeProducts";
const store = useProduct();
const results =ref();

async function getGenere(){
  await store.getApi();
  results.value =  store.responseUrl.filter(el => el.genere === 'male')
}
onMounted(() => {

  getGenere();

});
</script>
<template>
  <layout>
    <template #scope>
      <Scope
        :title="'Masculino'"
        :text="textMasculine"
        :img="`bg-[url('../assets/images/masculine/bg.jpg')]`"
      />
    </template>
    <template #prod>
      <div class="" v-for="item in results" :key="item._id">
        <Products
          :title="item.title"
          :items="item"
          :img="item.image_url"
          :price="item.price"
          :id="item._id"
        />
        
      </div>
    </template>
  </layout>
</template>
../../helpers/getApi../../helpers/message
