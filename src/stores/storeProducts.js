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
  const userToken = ref("");
  const token = ref('');
  const checkLogin = ref();
  const credentials = ref()

//token Temporario
 function getLocal(){
  const jsonToken = localStorage.getItem('credentials')
  if(!jsonToken) return;
  token.value = JSON.parse(jsonToken).tokenLocal,
  credentials.value = JSON.parse(jsonToken)

 
 }
 getLocal()
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

try {
  const {data} = await instance.post('/products', raw, {
    headers:{
      "Content-Type": "application/json",
      "authorization" : `${token.value}`
    }
  })
  getApi()
  
} catch (error) {
  console.log(error)
  
}

  }

  async function deleteProduct(id) {
    await instance.delete(`/products/${id}`,{
      headers:{
        
        "authorization" : `${token.value}`
      }
    });
    getApi();
  }


  return {
    infoProduct,
    getApi,
    postProduct,
    deleteProduct,
    responseUrl,
    skeletonLoad,
    verifyUserAdm,
    verifyUser,
    token,
    credentials,
 
  };
});
