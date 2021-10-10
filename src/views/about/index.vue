<template>
  <div class="container">
    <div class="title">关于</div>
    <div>只测试权限按钮</div>
    <el-button type="primary" v-if="roles[0] === 'admin' || roles.includes(10101)">新增</el-button>
    <el-button type="primary" v-if="roles[0] === 'admin' || roles.includes(10102)">修改</el-button>
    <el-button type="primary" v-if="roles[0] === 'admin' || roles.includes(10103)">删除</el-button>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { getRoles } from '@/common/views'
  export default defineComponent({
    name: 'About',
    setup(props) {
      const roles = getRoles()

      type TUser = {
        n: number
        s: string
      }
      function fn<T extends TUser>(user: T): T {
        return {
          ...user,
          n: user.n,
          s: user.s
        }
      }

      // function fn2(A: string | number, B: string | number) {
      //   if (typeof A === 'string') {
      //     return A + ':' + B
      //   } else {
      //     return A + B
      //   }
      // }

      function fn2(A: string, B: string): string
      function fn2(A: number, B: number): number
      function fn2(A: string | number, B: string | number): string | number {
        if (typeof A === 'string') {
          return A + ':' + B
        } else {
          return (A as number) + (B as number)
        }
      }

      fn2(1, 2)
      fn2('1', '2')
      // fn2(1, '2')

      function isString(T: string[] | number[]): T is string[] {
        return typeof T[0] === 'string'
      }
      function fn3(...arg: string[] | number[]): string | number {
        if (isString(arg)) {
          return arg[0] + ':' + arg[1]
        } else {
          return arg[0] + arg[1]
        }
      }

      fn3(1, 2)
      fn3('1', '2')
      // fn3(1, '2')

      // 变成可选
      interface Todo {
        title: string
        description: string
      }

      function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
        return { ...todo, ...fieldsToUpdate }
      }

      // 变成指定可选
      type Foo = {
        a: number
        b?: string
        c: boolean
      }

      type Simplify<T> = {
        [P in keyof T]: T[P]
      }

      type SetOptional<T, K extends keyof T> = Simplify<
        Partial<Pick<T, K>> & Pick<T, Exclude<keyof T, K>>
      >

      // 测试用例
      type SomeOptional = SetOptional<Foo, 'a' | 'b'>
      // type SomeOptional = {
      //  a?: number; // 该属性已变成可选的
      //  b?: string; // 保持不变
      //  c: boolean;
      // }

      interface Todo {
        title: string
        description: string
        completed: boolean
      }

      type TodoPreview = Pick<Todo, 'title' | 'completed'>

      const todo: TodoPreview = {
        title: 'Clean room',
        completed: false
      }

      interface Example {
        a: string
        b: string | number
        c: () => void
        d: {}
      }

      // 测试用例：
      // type StringKeysOnly = ConditionalPick<Example, string>
      //=> {a: string}

      type ConditionalKeys<T, Condition> = {
        [P in keyof T]: T[P] extends Condition ? P : never
      }[keyof T]

      type ConditionalPick<T, Condition> = Pick<T, ConditionalKeys<T, Condition>>

      // 测试用例：
      interface Example {
        a: string
        b: string | number
        c: () => void
        d: {}
      }
      type C = ConditionalKeys<Example, string>
      type StringKeysOnly = ConditionalPick<Example, string>
      //=> {a: string}

      type AppendArgument<F extends (...args: any) => any, A> = (
        x: A,
        ...args: Parameters<F>
      ) => ReturnType<F>

      type Fn = (a: number, b: string) => number
      type FinalF = AppendArgument<Fn, boolean>
      // (x: boolean, a: number, b: string) => number

      // type AppendArgument<F, T> = F extends (...args: infer Args) => infer Return
      //   ? (x: T, ...args: Args) => Return
      //   : never

      // type Fn = (a: number, b: string) => number
      // type FinalFn = AppendArgument<Fn, boolean>
      // (x: boolean, a: number, b: string) => number

      return { roles }
    }
  })
</script>

<style lang="scss" scoped>
  .container {
    .title {
      font-size: 24px;
      margin-bottom: 20px;
    }
  }
</style>
