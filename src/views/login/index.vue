<template>
  <div class="login">
    <div class="login-title">登 陆</div>
    <el-form
      :model="loginForm"
      :hide-required-asterisk="true"
      status-icon
      :rules="rules"
      ref="formRef"
      label-width="100px"
      class="login-form"
    >
      <el-form-item label="账号" prop="account">
        <el-input
          v-model="loginForm.account"
          placeholder="请输入账号"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          placeholder="请输入密码"
          autocomplete="off"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" class="btn" type="primary" @click="onLogin">登 陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import JSEncrypt from 'jsencrypt'
  import { useStore } from 'vuex'

  import { cusLocalStorage } from '@/common'

  import { toLogin, getPublicKey, LoginForm } from '@/api/login'

  export default defineComponent({
    setup() {
      const router = useRouter()
      const store = useStore()

      // 初始化tags
      const homePath = localStorage.getItem('homePath') || ''
      store.dispatch('layout/start_tagViews', { home: router.resolve(homePath) })

      // 验证
      const rules = {
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
      const loginForm: LoginForm = reactive({
        account: '',
        password: ''
      })
      const formRef: any = ref<Document | null>(null)

      // 登陆
      const onLogin = () => {
        if (formRef) {
          formRef.value.validate(async (valid: boolean) => {
            if (valid) {
              loading.value = true
              try {
                const { data: publicKey }: { data: string } = await getPublicKey()
                const jsencrypt = new JSEncrypt({}) // 创建加密对象实例
                jsencrypt.setPublicKey(publicKey) //设置公钥
                let password = jsencrypt.encrypt(loginForm.password) || ''
                const { data } = await toLogin({ account: loginForm.account, password })
                // 存储数据
                cusLocalStorage.set('token', data.token)
                cusLocalStorage.set('user', {
                  id: data.id,
                  userId: data.userId,
                  account: data.account,
                  name: data.name
                })
                loading.value = false
                router.push('/')
              } catch {
                loading.value = false
              }
            }
          })
        }
      }

      const loading = ref(false)

      return {
        formRef,
        rules,
        loginForm,
        onLogin,
        loading
      }
    }
  })
</script>

<style lang="scss" scoped>
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    &-title {
      font-size: 36px;
      margin-bottom: 30px;
    }
    &-form {
      width: 450px;
      .btn {
        width: 100%;
      }
    }
  }
</style>
