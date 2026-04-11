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
        let response=await fetch("http://127.0.0.1:8000/member/auth",{
            method:"PUT",
            body:JSON.stringify({"email":login_email.value, "password":login_password.value})
        });
        let result=await response.json();
        if(result.login){
            alert("登入成功");
            router.push("/")
        }else{
            alert("登入失敗");
        }
    };


let signup = async function() {
        let response=await fetch("http://127.0.0.1:8000/member",{
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

    <div v-if="display_login" class="card">
        <h2>登入</h2>
        email
        <input type="text" id="signin_email" v-model="login_email"/>
        password
        <input type="text" id="signin_password" v-model="login_password"/>
        <button @click="signin">登入</button>
        <button @click="change_display">註冊帳號</button>
    </div>
    <div v-else class="card">
        <h2>註冊</h2>
        name<input type="text" id="signup_name" v-model="signup_name"/></br>
        email<input type="text" id="signup_email" v-model="signup_email"/></br>
        password<input type="text" id="signup_password" v-model="signup_password"/></br>
        <button @click="signup">註冊</button>
        <button @click="change_display">返回登入</button>
    </div>
</template>