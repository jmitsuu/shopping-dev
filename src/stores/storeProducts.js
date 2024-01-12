import { ref, computed } from "vue";
import { defineStore } from "pinia";
import instance from "../http/getUrl";
import axios from "axios";
const url = import.meta.env.VITE_API_URL;
export const useProduct = defineStore("useProduct", () => {
  const infoProduct = ref();
  const responseUrl = ref();
  const skeletonLoad = ref(false);
  const verifyUserAdm = ref(false);
  const verifyUser = ref();
  const userName = ref("");

  //this function receive route parameters
  const getApi = async (fetch) => {
    skeletonLoad.value = true;
    try {
      responseUrl.value = (await instance.get(`/products/`)).data;
      skeletonLoad.value = false;
    } catch (error) {
      alert(error.message);
    }
  };
  async function postProduct(items) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(items);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${url}/products`, requestOptions)
      .then(() => {
        getApi();
      })
      .catch((error) => console.log("error", error));
  }

  async function deleteProduct(id) {
    await instance.delete(`/products/${id}`);
    getApi();
  }
  function credentials(name, auth, level, token) {
  
    if(level === 3 && token){
      verifyUserAdm.value =true;
    }
    localStorage.setItem(
      "credentials",
      JSON.stringify({ userName: name, verifyUser: auth, acess_level:level, tokenLocal:token })
    );
    const getCredentials = localStorage.getItem("credentials");
  
    const userLocal = JSON.parse(getCredentials);
    if (!userLocal) return;
  

   
    console.log( userName.value, verifyUser.value,  verifyUserAdm.value )
  }

  return {
    infoProduct,
    getApi,
    credentials,
    postProduct,
    deleteProduct,
    responseUrl,
    skeletonLoad,
    userName,
    verifyUserAdm,
    verifyUser,
  };
});
