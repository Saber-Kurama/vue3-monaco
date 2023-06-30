<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from "./components/HelloWorld.vue";
import Edit from "./components/Editor.vue";
import MonacoEditor from '../../../src/index';
import { ref } from "vue";

const code = ref("");
</script>

<template>
  <MonacoEditor v-model="code" language="properties" theme="vs"></MonacoEditor>
  <!-- <Edit v-model="code"></Edit> -->
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
