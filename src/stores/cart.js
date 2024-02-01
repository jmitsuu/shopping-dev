import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCart = defineStore("useCart", () => {
  const cart = ref([]);
  const modalCart = ref(false);
  const prices = ref([]);
  const total = ref();
  const countCart = ref('');
  const notification = ref()
  function incrementCart(item) {
    if(countCart.value < 1){
      countCart.value= false
    }
    if (!item) return;


    const findItem = cart.value.findIndex((el) => el._id == item._id);
    
    if (findItem >= 0) return;

    cart.value.push(item);
    countCart.value = cart.value.length;
    const priceNumber = parseFloat(item.price);
    prices.value.push(priceNumber);
    total.value = prices.value.reduce((acc, val) => acc + val);
    notification.value = true;
    setTimeout(() => {
      notification.value = false
    }, 1200);
  }
  function removeItemCart(item) {
    if(cart.value.length < 2 ) {
      modalCart.value = false
      countCart.value = ''
      total.value = ''
    }
  
    cart.value.splice(item, 1);
    countCart.value = cart.value.length;
    prices.value.splice(item, 1);
    total.value = prices.value.reduce((acc, val) => acc + val);
  }
  return { incrementCart, removeItemCart, modalCart, cart, total, countCart, notification };
});
