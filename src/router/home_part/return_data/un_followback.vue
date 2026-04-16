<script setup>
    import {ref} from "vue";
    let data = ref([]);
    let getData = async function() {
        try {
            let response = await fetch("/api/json/unfollow_back", { method: "GET" });
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
.list-item { padding: 8px 10px; border-bottom: 1px solid #eee; color: #444; }
.list-item:last-child { border-bottom: none; }
</style>