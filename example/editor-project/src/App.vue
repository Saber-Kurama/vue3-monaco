<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from "./components/HelloWorld.vue";
import Edit from "./components/Editor.vue";
import MonacoEditor from '../../../src/index';
import { MonacoDiffEditor } from '../../../src/index';
import { ref } from "vue";

const code = ref("1");
const code1 = ref("2");
const readonly = ref(false);
setTimeout(() => {
  readonly.value = true
}, 5000)
</script>

<template>
  <div>
    <div style="height: 300px;">
      <MonacoEditor v-model="code" language="javascript" theme="vs"></MonacoEditor>
    </div>
    xxx
    <div style="height: 300px;">
      <MonacoEditor v-model="code1" language="javascript" theme="Dracula"></MonacoEditor>
    </div>
    xxx
    <div style="height: 300px;">
      <MonacoDiffEditor v-model:modifiedValue="code" v-model:originalValue="code1" language="javascript" theme="Dracula" :readonly="readonly"></MonacoDiffEditor>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
}
</style>
