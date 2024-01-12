<script setup>
import { ref, onMounted } from "vue";
import Products from "../../components/Products.vue";
import layout from "../../components/layout.vue";
import Scope from "../../components/Scope.vue";
import { textJewelry } from "../../helpers/message";
import { useProduct } from "../../stores/storeProducts";
const store = useProduct();
onMounted(() => {
  store.getApi("/category/jewelery");
});
</script>
<template>
  <layout>
    <template #scope>
      <Scope :title="'Jóias'" :text="textJewelry" />
    </template>
    <template #prod>
      <div class="" v-for="item in store.responseUrl" :key="item.id">
        <Products
          :title="item.title"
          :items="item"
          :img="item.image"
          :price="item.price"
          :id="item.id"
        />
      </div>
    </template>
  </layout>
</template>
../../helpers/getApi../../helpers/message
