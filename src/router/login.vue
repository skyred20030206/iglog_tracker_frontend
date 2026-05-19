<script setup>
import {ref,onMounted} from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();

let display_login = ref(true);
let login_email=ref("");
let login_password=ref("");
let signup_name=ref("");
let signup_email=ref("");
let signup_password =ref("");


// 切換註冊登入
let change_display = function(){
    display_login.value=!display_login.value;
};

let signin= async function() {
        let response=await fetch("/api/member/auth",{
            method:"PUT",
            credentials: "include",
            body:JSON.stringify({"email":login_email.value, "password":login_password.value})
        });
        let result=await response.json();
        if(result.login){
            alert("登入成功");
            router.push("/");
        }else{
            alert("登入失敗");
        }
    };


let signup = async function() {
        let response=await fetch("/api/member",{
            method:"POST",
            body:JSON.stringify({"name":signup_name.value, "email":signup_email.value, "password":signup_password.value})
        });
        let result=await response.json();
        console.log(result.sign)
        if(result.sign){
            alert("註冊成功");
            display_login.value=!display_login.value;
        }else{
            alert("註冊失敗");
        }
    }

</script>

<template>
    <div class="analysis-container">
        <div v-if="display_login" class="card">
            <h2>登入</h2>
            電子信箱<br />
            <input type="text" id="signin_email" v-model="login_email"/><br />
            密碼<br />
            <input class="marginBTM" type="text" id="signin_password" v-model="login_password"/><br />
            <button class="btn-submit" @click="signin">登入</button><br />
            <button class="btn-submit" @click="change_display">註冊帳號</button>
        </div>
        <div v-else class="card">
            <h2>註冊</h2>
            使用者名稱<br />
            <input type="text" id="signup_name" v-model="signup_name"/><br />
            電子信箱<br />
            <input type="text" id="signup_email" v-model="signup_email"/><br />
            密碼<br />
            <input class="marginBTM" type="text" id="signup_password" v-model="signup_password"/><br />
            <button class="btn-submit" @click="signup">註冊</button><br />
            <button class="btn-submit" @click="change_display">返回登入</button>
        </div>
    </div>
        
</template>

<style scoped>
.marginBTM{
    margin-bottom: 20px;
}

.analysis-container {
    
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  padding: 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

/* 卡片樣式 */
.card {
  background: #ffffff;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 500px;
  text-align: center;
}

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