<script setup>
  import {ref} from "vue";
  let login_status = ref(true);
  let username = ref("");

  let checkStatus = async function() {
        let response=await fetch("/api/member/auth",{
            method:"GET",
            credentials: "include",
        });
        let result=await response.json();
        console.log(result);
        if (result.auth){
            login_status.value=true;
            username.value = result.name;
        }else{
            login_status.value=false;
        }
    };
    checkStatus();

    let logout = async function() {
        let response=await fetch("/api/logout",{
            method:"POST"
        });
        window.location.reload();
    }
</script>

<template>
    <header class="navbar">
        <div class="logo">
                IG 追蹤者紀錄
        </div>
        <div class="login_status">
          <div v-if="login_status">
            {{ username }}
            <button @click="logout">登出</button>
          </div>
          <div v-else>
            <router-link  to="/login">
              <button>登入</button>
            </router-link>
          </div>
          
        </div>
        
    </header>
</template>

<style scoped>
.navbar {
  /* 鎖定位置 */
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px; /* 設定高度 */
  z-index: 1000; /* 確保它在最上層 */

  /* 顏色與美化 */
  background-color: #f5f5f5; /* 淺灰色 */
  border-bottom: 1px solid #e0e0e0; /* 細緻的下邊框 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); /* 輕微陰影 */

  /* 內容佈局 */
  display: flex;
  align-items: center; /* 垂直置中 */
  padding: 0 20px;
  box-sizing: border-box; /* 避免 padding 撐開寬度 */
}


.login_status {
  position: absolute;
  right: 20px; /* 距離右邊 20px */
}
</style>
