<script setup>
import {ref} from "vue";
import un_followback from "./return_data/un_followback.vue";
import exit_fans from "./return_data/exit_fans.vue";
import ignore_list from "./return_data/ignore_list.vue";

let display = ref("un_followback");

let change_display = function(status){
    display.value = status;
}

</script>

<template>
    <div class="analysis-container">
        <div class="card">
            <nav>
                <span :class="display==='un_followback'?'current':''" @click="change_display('un_followback')">未回追</span>
                <span :class="display==='exit_fans'?'current':''" @click="change_display('exit_fans')">退追蹤</span>
                <span :class="display==='ignore_list'?'current':''" @click="change_display('ignore_list')">忽略名單</span>
            </nav>
            <main>
                <un_followback  v-if="display==='un_followback'"></un_followback>
                <exit_fans v-if="display==='exit_fans'"></exit_fans>
                <ignore_list v-if="display==='ignore_list'"></ignore_list>
            </main>
        </div>
    </div>
</template>

<style scoped>
.analysis-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
.card {
 width: 100%;
 max-width: 500px;
 background: #fff;
 border: 1px solid #e0e0e0;
 padding: 2.5rem; 
 border-radius: 12px;
 box-shadow: 0 10px 25px rgba(0,0,0,0.08);
 margin-bottom:  20px;
 text-align: left;}

 nav{
    display: flex;
    justify-content: center;
    gap: 20px;
    font-size: 20px;
}
 nav>span{
    flex:none;
    text-align: center;
    
    justify-content: center;}
 nav>span.current{font-weight: bold;}

 main{justify-content: center;}

</style>