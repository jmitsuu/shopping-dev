<script setup>
defineProps({
style:String,
message:String,

})


</script>
<template>
      <div
          
                class="bg-orange-100 border-l-4 absolute right-0 top-0 m-4 rounded-md border-orange-500 text-orange-700 p-4"
                role="alert"
                :class="style"
              >
                <p class="font-bold">Aviso!</p>
                <p>{{ message }}</p>
              </div>
</template>