import {ref} from "vue"
 export const name = ref();
export const userToJson = ref()
function getCredentials(){

    const getUserLocal = localStorage.getItem('credentials');
    userToJson.value= JSON.parse(getUserLocal)
    if (!userToJson.value) return;
    name.value = userToJson.value.userName;
  
}
getCredentials();

