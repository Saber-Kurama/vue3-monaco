<script setup lang="ts">
import { onMounted, ref } from "vue";
import { monaco } from "./customMonaco";
// import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
// import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';

// @ts-ignore
// self.MonacoEnvironment = {
//   getWorker(workerId: any, label: string) {
//     if (label === 'json') {
//       return new JsonWorker();
//     }
//     return new EditorWorker();
//   },
// };
const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const dom = ref();

let instance: any;

onMounted(() => {
  const jsonModel = monaco.editor.createModel(
    props.modelValue || "",
    "json",
    monaco.Uri.parse("json://grid/settings.json")
  );

  instance = monaco.editor.create(dom.value, {
    model: jsonModel,
    tabSize: 2,
    automaticLayout: true,
    scrollBeyondLastLine: false,
  });

  instance.onDidChangeModelContent(() => {
    const value = instance.getValue();
    emit("update:modelValue", value);
  });
});
</script>
<template>
  <div class="editor" ref="dom"></div>
</template>
<style>
.editor {
  height: 100%;
}
</style>
