<template>
    <el-form ref="formRef" label-width="80px" :model="form" :rules="rules">
        <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="">
            <el-button size="medium" type="primary" @click="save">保 存</el-button>
            <el-button size="medium" @click="cancel">取 消</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus';

import { phone } from '@/common/regexp'
import { updateUser, UpdateData } from '@/api/user'

export default defineComponent({
    props:{
        userForm:{
            type:Object,
            required:true
        }
    },
    setup(props,context) {
        const obj = {
            id: props.userForm.id,
            name: props.userForm.name,
            phone: props.userForm.phone
        }
        const form:UpdateData = reactive(obj);
        
        const formRef = ref<any>(null);
        // 规则
        const rules = {
            name: [
                { required: true, message: '姓名不能为空', trigger: 'change' }
            ],
            phone: [
                { required: true, message: '手机号码不能为空', trigger: 'change' },
                { pattern: phone, message: '手机号码格式不正确', trigger: 'blur' }
            ]
        }

        // 保存
        const save = () => {
            formRef.value.validate((valid:boolean) => {
                if (valid) {
                    updateUser(form).then(()=>{
                        context.emit("onSearch");
                        ElMessage.success("修改成功！")
                        context.emit('update:dialogEditVisible',false);
                    })
                } 
            });
            
        }
        
        // 取消
        const cancel = () => {
            context.emit('update:dialogEditVisible',false);
        }

        return {
            form,
            formRef,
            rules,
            save,
            cancel
        }
    },
})
</script>
