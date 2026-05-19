<script setup>
import {ref,onMounted} from "vue";

let a=ref(null);
onMounted(async function(){
  let response = await fetch("http://127.0.0.1:8000/test");
  response= await response.json();
  console.log(response);
  a.value=response;
});

</script>

<template>
  <RouterView></RouterView>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

* {
  box-sizing: border-box;
}
</style>
