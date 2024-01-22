import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCart = defineStore("useCart", () => {
  const cart = ref([]);
  const modalCart = ref();
  const prices = ref([]);
  const total = ref();
  const countCart = ref();
  function incrementCart(item) {
    if (!item) return;
    const findItem = cart.value.findIndex((el) => el._id == item._id);
    if (findItem >= 0) return;
    cart.value.push(item);
    countCart.value = cart.value.length;
    const priceNumber = parseFloat(item.price);
    prices.value.push(priceNumber);
    total.value = prices.value.reduce((acc, val) => acc + val);
  }
  function removeItemCart(item) {
    cart.value.splice(item, 1);
    if (countCart.value == 0) {
      countCart.value = "";
    }
    countCart.value = cart.value.length;
    prices.value.splice(item, 1);
    total.value = prices.value.reduce((acc, val) => acc + val);
  }
  return { incrementCart, removeItemCart, modalCart, cart, total, countCart };
});
