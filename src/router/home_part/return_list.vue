<script setup>
import {ref} from "vue";
import un_followback from "./return_data/un_followback.vue";
import exit_fans from "./return_data/exit_fans.vue";
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
            </nav>
            <main>
                <un_followback  v-if="display==='un_followback'"></un_followback>
                <exit_fans v-if="display==='exit_fans'"></exit_fans>
            </main>
        </div>
    </div>
</template>

<style scoped>
.analysis-container {
  display: flex;
  justify-content: center;
  min-height: 400px;
  padding: 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
.card {
 width: 400px;
 background: #fff;
 border: 1px solid #e0e0e0;
 padding: 25px; border-radius: 12px;
 box-shadow: 0 4px 6px rgba(0,0,0,0.1);
 margin-bottom:  20px;}

 .nav{font-size: 20px;}
 nav>span{margin-right: 10px;}
 nav>span.current{font-weight: bold;}

</style>