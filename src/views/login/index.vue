<template>
    <div class="login">
        <el-form :model="loginForm" :hide-required-asterisk="true" status-icon :rules="rules" ref="formRef" label-width="100px" class="login-form">
            <el-form-item label="账号" prop="account">
                <el-input v-model="loginForm.account" placeholder="请输入账号" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="loginForm.pass" placeholder="请输入密码" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="btn" type="primary" @click="submitForm">登 陆</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router"

export default defineComponent({
    setup(){
        const rules = {
            account: [
                { required: true, message: '请输入账号', trigger: 'change' }
            ],
            pass: [
                { required: true, message: '请输入密码', trigger: 'blur' }
            ],
        };
        type loginForm = {
            account:string,
            pass:string
        }
        const loginForm:loginForm = reactive({
            account:'',
            pass:''
        })
        const formRef:any = ref<Document|null>(null);
        const router = useRouter();
        const submitForm = () => {
            if(formRef){
                formRef.value.validate((valid:boolean) => {
                    if (valid) {
                        router.push("/");
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
    &-form{
        width: 450px;
        .btn{
            width: 100%;
        }
    }
}
</style>