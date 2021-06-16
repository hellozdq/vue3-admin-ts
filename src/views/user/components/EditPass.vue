<template>
    <el-form class="" label-width="80px" :model="form" :rules="rules">
        <el-form-item label="账号">
            <el-input v-model="form.account" disabled></el-input>
        </el-form-item>
        <el-form-item label="原密码" prop="password">
            <el-input v-model="form.password" type="password" placeholder="请输入原密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="form.newPassword" type="password" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="再次输入" prop="newPassword2">
            <el-input v-model="form.newPassword2" type="password" placeholder="请再次输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="">
            <el-button size="medium" type="primary" @click="save">保 存</el-button>
            <el-button size="medium" @click="cancel">取 消</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { ElMessage } from 'element-plus';

import { updatePassword, UpdataData } from '@/api/login'

export default defineComponent({
    props:['userId'],
    setup(props,context) {
        const form:UpdataData = reactive({
            id:0,
            account:'',
            password:'',
            newPassword:'',
            newPassword2:''
        });
        
        // 验证两次密码
        const validatePass2 = (rule, value, callback) => {
            if (value !== form.newPassword) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        }
        // 规则
        const rules = {
            password: [
                { required: true, message: '原密码不能为空', trigger: 'blur' }
            ],
            newPassword: [
                { required: true, message: '新密码不能为空', trigger: 'blur' }
            ],
            newPassword2: [
                { required: true, message: '请再次输入密码', trigger: 'blur' },
                { validator: validatePass2, trigger: 'blur' }
            ]
        }

        // 保存
        const save = () => {
            const { id, account, password, newPassword } = form
            updatePassword({ id, account, password, newPassword }).then(()=>{
                ElMessage.success("修改成功！")
                context.emit('update:dialogPassVisible',false);
            })
        }
        
        // 取消
        const cancel = () => {
            context.emit('update:dialogPassVisible',false);
        }

        return {
            form,
            rules,
            save,
            cancel
        }
    },
})
</script>
