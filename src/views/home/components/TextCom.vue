<template>
    <div>
        <el-input v-model="name.name"></el-input>
        <!-- <el-checkbox-group v-model="name.name">
            <el-checkbox :label="1"></el-checkbox>
            <el-checkbox :label="2"></el-checkbox>
        </el-checkbox-group> -->
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props:['name'],
    setup(props) {
        console.log(props.name)
        props.name.name = "999"
    },
})
</script>
