<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, ref, watch } from "vue";
import { monaco } from "./customEditor"
import { addCssUtils } from "./utils";
// import { modelUri } from './languages/yaml'

export default defineComponent({
  name: "MonacoEditor",
});
</script>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    /**
     * 编辑器的内容
     */
    modelValue?: string;
    /**
     * 语言
     */
    language?: string;
    /**
     * 皮肤
     */
    theme?: string;
    options?: monaco.editor.IStandaloneEditorConstructionOptions;
    width?: string | number;
    height?: string | number;
  }>(),
  {
    modelValue: "",
    language: "javascript",
    theme: "vs",
    options: {} as any,
    // options: { tabSize: 2 } as any,
    width: "100%",
    height: "100%",
  }
);
const emits = defineEmits<{
  /**
   * 更新modelValue
   */
  (event: "update:modelValue", value: string): void;
  /**
   * editor 挂载完成
   */
  (event: "editorDidMount", editor: monaco.editor.IStandaloneCodeEditor): void;
}>();
const dom = ref<HTMLElement>();

const style = computed(() => {
  return {
    width: addCssUtils(props.width),
    height: addCssUtils(props.height),
  };
});
let editorInstance: monaco.editor.IStandaloneCodeEditor;
// 初始化插件
const initMonaco = () => {
  if (dom.value) {
    const defaultOptions = {

    }
    // props.options?.tabSize
    editorInstance = monaco.editor.create(dom.value, {
      value: props.modelValue, // 自动创建 modal
      theme: props.theme,
      language: props.language,
      // ...props.options,
    });
    editorInstance.onDidChangeModelContent(() => {
      const value = editorInstance.getValue() || "";
      emits("update:modelValue", value);
    });
    emits("editorDidMount", editorInstance);
  }
};
onMounted(() => {
  nextTick(() => {
    initMonaco();
  })
  
});

const changeModelByLanguage = (language: string) => {
  // if (props.language === "yaml") {
  //   const model = monaco.editor.createModel('p1: \np2: \n', 'yaml', modelUri);
  //   if(editorInstance) {
  //     editorInstance.setModel(model);
  //   }
  // }
}

watch(() => props.language, (language) => {
  changeModelByLanguage(language)
})

// 内容发生修改
watch(
  () => props.modelValue,
  (newVal) => {
    if (editorInstance && newVal !== editorInstance.getValue()) {
      editorInstance.setValue(newVal);
    }
  }
);

watch(
  () => props.language,
  (newVal) => {
    if (newVal && editorInstance) {
      const model = editorInstance.getModel();
      model && monaco.editor.setModelLanguage(model, newVal);
    }
  }
);
const getEditor = () => {
  return editorInstance;
};
defineExpose({
  getEditor,
});
</script>
<template>
  <div ref="dom" :style="style"></div>
</template>
