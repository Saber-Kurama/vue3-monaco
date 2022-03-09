<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
// TODO: 如何做到按需加载 修改 vite的插件
// 第一版本 先不考虑 按需
import * as monaco from "monaco-editor";
const addCssUtils = (val: string | number) => {
  val.toString().endsWith
  if(/.*(px|rem|%)/i.test(val.toString())){
    return val
  }
  if(!isNaN(Number.parseFloat(val.toString()))){
    return `${val}px`
  }
  return val
}
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
    width: '100%',
    height: '100%'
  }
);
const emits = defineEmits<{
  /**
   * 更新modelValue
   */
  (event: "update:modelValue", value: string): void;
}>();
const dom = ref<HTMLElement>();

const style = computed(() => {
  return {
    width: addCssUtils(props.width),
    height: addCssUtils(props.height)
  }
})
let editorInstance: any;
// 初始化插件
const initMonaco = () => {
  if (dom.value) {
    // props.options?.tabSize
    editorInstance = monaco.editor.create(dom.value, {
      value: props.modelValue, // 自动创建 modal
      theme: props.theme,
      language: props.language,
      ...props.options,
    });
    editorInstance.onDidChangeModelContent(() => {
      const value = editorInstance.getValue();
      emits("update:modelValue", value);
    });
  }
};
onMounted(() => {
  initMonaco();
});
</script>
<template>
  <div ref="dom" :style="style"></div>
</template>
