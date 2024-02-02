<script setup>
import { ref, onMounted, watch } from "vue";
import Products from "../../components/Products.vue";
import layout from "../../components/layout.vue";
import Scope from "../../components/Scope.vue";
import { male, female } from "../../helpers/message";
import { useProduct } from "../../stores/storeProducts";
import { useRoute } from "vue-router";

const route = useRoute()
const store = useProduct();
const results = ref();
async function getGenere() {
    await store.getApi();

    results.value = store.responseUrl.filter(el => el.genere === route.query.gender)

    watch(route, async (newResults, oldResults) => {
        if (newResults) {
            await store.getApi();
            results.value = store.responseUrl.filter(el => el.genere === route.query.gender);
        }
    })
}



onMounted(() => {
    getGenere();

});
</script>
<template>
    <layout>
        <template #scope>
            <Scope :text="route.query.gender == 'male' ? male : female" :img="route.query.gender" />
        </template>
        <template #prod>
            <div class="" v-for="item in results" :key="item._id">
                <Products :title="item.title" :items="item" :img="item.image_url" :price="item.price" :id="item._id" :idPro="item._id" />

            </div>
        </template>
    </layout>
</template>

