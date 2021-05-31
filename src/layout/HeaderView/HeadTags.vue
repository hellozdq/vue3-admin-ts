
<template>
    <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
        <el-tab-pane
            v-for="(item, index) in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
        >
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts">
import { defineComponent,ref } from "vue";

export default defineComponent({
    setup(){
    const activeValue = ref<String>("2");
    const editableTabs = [{
            title: 'Tab 1',
            name: '1',
            content: 'Tab 1 content'
        }, 
        {
            title: 'Tab 2',
            name: '2',
            content: 'Tab 2 content'
        }]
    const tabIndex = 2;
    const editableTabsValue = ref("");
    const addTab = (targetName) => {
        // let newTabName = ++this.tabIndex + '';
        // this.editableTabs.push({
        //     title: 'New Tab',
        //     name: newTabName,
        //     content: 'New Tab content'
        // });
        // this.editableTabsValue = newTabName;
    }
    const removeTab = (targetName) => {
        // let tabs = this.editableTabs;
        // let activeName = this.editableTabsValue;
        // if (activeName === targetName) {
        //     tabs.forEach((tab, index) => {
        //     if (tab.name === targetName) {
        //         let nextTab = tabs[index + 1] || tabs[index - 1];
        //         if (nextTab) {
        //         activeName = nextTab.name;
        //         }
        //     }
        //     });
        // }

        // this.editableTabsValue = activeName;
        // this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    }
    return { 
        activeValue,
        editableTabs,
        tabIndex,
        editableTabsValue,
        addTab,
        removeTab
    }
}
})
</script>

<style>

</style>
