<script setup>
    import {ref} from "vue";
    let data = ref([]);
    let getData = async function() {
        try {
            let response = await fetch("/api/json/follower", { method: "GET" });
            if (response.ok) {
                let result = await response.json();
                console.log(result);
                data.value = result;
            }
        } catch (err) {
            console.log("尚未有資料或無法連線");
        }
    }
    getData();
</script>

<template>
    <div class="analysis-container">
        <div class="card">
            <div class="list-item" v-for="user in data">
                <a :href="'https://www.instagram.com/'+user[0]">{{ user[0] }}</a>
            </div>
        </div>
    </div>
    
</template>

<style>
.analysis-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  padding: 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
.card { width: 400px; background: #fff; border: 1px solid #e0e0e0; padding: 25px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 20px;}
.list-item { padding: 8px 10px; border-bottom: 1px solid #eee; color: #444; }
.list-item:last-child { border-bottom: none; }
</style>