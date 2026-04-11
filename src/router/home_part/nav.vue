<script setup>

</script>

<template>
    <header class="navbar">
        <div class="logo">
                IG 追蹤者紀錄
        </div>
        <router-link class="login_btn" to="/login">
            <button>登入</button>
        </router-link>
    </header>
</template>

<style scoped>
.navbar {
  /* 鎖定位置 */
  position: fixed;
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

/* 給 body 留白，避免內容被 Header 擋住 */
body {
  margin: 0;
  padding-top: 60px; /* 與 Header 的高度一致 */
}

.login_btn {
  position: absolute;
  right: 20px; /* 距離右邊 20px */
}
</style>
