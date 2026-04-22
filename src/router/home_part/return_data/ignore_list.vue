<script setup>
    import {ref,computed} from "vue";
    let un_followback_data = ref([]);
    let ignore_list = ref([]);
    let get_un_followback_Data = async function() {
        try {
            let response = await fetch("/api/json/ignore_list", { method: "GET" });
            if (response.ok) {
                let result = await response.json();
                //console.log(result);
                un_followback_data.value = result;
            }
        } catch (err) {
            console.log("尚未有資料或無法連線");
        }
    }
    get_un_followback_Data();
    

    
    const ignore_data = computed(() => {
        return un_followback_data.value.filter(user => 
            ignore_list.value.includes(user[0]));
    });

    let save_ignore =async function(){
        const response = await fetch('/api/json/ignore_list/save', {
            headers: {
                'Content-Type': 'application/json'
                },
            method: 'POST',
            body: JSON.stringify(ignore_data.value)
        });
        const result = await response.json();
        console.log(result);
        if (result.ok){
            alert("儲存成功");
        }
        else{
            alert("儲存失敗");
        }
    }
</script>

<template>
    <div class="analysis-container">
        <div class="board">
            <button class="btn-submit" @click="save_ignore">儲存忽略名單</button>
            <div class="list-item" v-for="user in un_followback_data">
                <a :href="'https://www.instagram.com/'+user[0]">{{ user[0] }}</a>
                <input class="check" type="checkbox" :value="user[0]" v-model="ignore_list" />
            </div>
            <div>{{ ignore_data }}</div>
        </div>
    </div>
    
</template>

<style>
.list-item { 
    display: flex;
    justify-content:space-between;
    padding: 8px 10px; border-bottom: 1px solid #eee; color: #444; }
.list-item:last-child { border-bottom: none; }
.board {width: 500px;}

.btn-submit {
  width: 100%;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.1s, opacity 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
</style>