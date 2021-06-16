<template>
    <div class="login">
        <div class="login-title">登 录</div>
        <el-form :model="loginForm" :hide-required-asterisk="true" status-icon :rules="rules" ref="formRef" label-width="100px" class="login-form">
            <el-form-item label="账号" prop="account">
                <el-input v-model="loginForm.account" placeholder="请输入账号" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="btn" type="primary" @click="submitForm">登 陆</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router'

import { login, LoginForm } from '@/api/login'
import { cusLocalStorage } from '@/common'

export default defineComponent({
    setup(){
        const rules = {
            account: [
                { required: true, message: '请输入账号', trigger: 'change' }
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' }
            ],
        };
        const loginForm:LoginForm = reactive({
            account:'',
            password:''
        })
        const formRef:any = ref<Document|null>(null);
        const router = useRouter();
        const submitForm = () => {
            if(formRef){
                formRef.value.validate((valid:boolean) => {
                    if (valid) {
                        login(loginForm).then((res)=>{
                            const data = res.data;
                            cusLocalStorage.set("token",data.token);
                            cusLocalStorage.set("userId",data.id);
                            router.push("/");
                        })
                    }
                });
            }
            
        }
        return {
            formRef,
            rules,
            loginForm,
            submitForm
        }
    }
})
</script>

<style lang="scss" scoped>
.login{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    &-title{
        text-align: center;
        padding-bottom: 20px;
        font-size: 36px;
    }
    &-form{
        width: 450px;
        .btn{
            width: 100%;
        }
    }
}
</style>