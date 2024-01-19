import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCart = defineStore("useCart", () => {
  const cart = ref([]);
  const modalCart= ref()
  function incrementCart(item) {
    if(!item) return;
    const findItem = cart.value.findIndex((el )=> el._id == item._id)
    if(findItem >= 0) return;
    console.log(cart.value)
    cart.value.push(item);
  }

  return { incrementCart , modalCart, cart };
});
