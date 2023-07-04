import {
  PropType,
  computed,
  defineComponent,
  nextTick,
  onMounted,
  ref,
  watch,
} from "vue";
import { addCssUtils } from "./utils";
import { monaco } from "./customEditor";
import { language } from "./languages/sql/sql";

export default defineComponent({
  name: "MonacoDiffEditor",
  props: {
    width: {
      type: [String, Number] as PropType<string | number>,
      default: "100%",
    },
    height: {
      type: [String, Number] as PropType<string | number>,
      default: "100%",
    },
    /**
     * 编辑器的原来内容
     */
    originalValue: {
      type: String as PropType<string>,
      default: "",
    },
    /**
     * 编辑器的原来内容
     */
    modifiedValue: {
      type: String as PropType<string>,
      default: "",
    },
    /**
     * 语言
     */
    language: {
      type: String as PropType<string>,
      default: "javascript",
    },
    /**
     * 皮肤
     */
    theme: {
      type: String as PropType<string>,
      default: "vs",
    },
    options: {
      type: Object as PropType<monaco.editor.IStandaloneEditorConstructionOptions>,
      default: {},
    },
    readonly: {
      type: [Boolean, Object] as PropType<
        boolean | { original: boolean; modified: boolean }
      >,
      default: false,
    },
  },
  emits: ["editorDidMount", "update:modifiedValue", "update:originalValue"],
  setup(props, { emit }) {
    const dom = ref<HTMLElement>();

    const style = computed(() => {
      return {
        width: addCssUtils(props.width),
        height: addCssUtils(props.height),
      };
    });
    const readonly = computed(() => {
      if (props.readonly === true) {
        return {
          original: true,
          modified: true,
        };
      } else if (props.readonly === false) {
        return {
          original: false,
          modified: false,
        };
      } else {
        return props.readonly;
      }
    });

    let editorInstance: monaco.editor.IStandaloneDiffEditor;
    let originalModel: monaco.editor.ITextModel;
    let modifiedModel: monaco.editor.ITextModel;
    // 初始化插件
    const initMonaco = () => {
      if (dom.value) {
        const defaultOptions = {};
        originalModel = monaco.editor.createModel(
          props.originalValue,
          props.language
        );
        modifiedModel = monaco.editor.createModel(
          props.modifiedValue,
          props.language
        );
        // props.options?.tabSize
        editorInstance = monaco.editor.createDiffEditor(dom.value, {
          originalEditable: true,
          automaticLayout: true,
          theme: props.theme,
          // language: props.language,
          // ...props.options,
        });

        editorInstance.setModel({
          original: originalModel,
          modified: modifiedModel,
        });
        editorInstance.updateOptions({
          readOnly: readonly.value.modified,
          originalEditable: !readonly.value.original,
        });

        modifiedModel.onDidChangeContent(() => {
          const value = modifiedModel?.getValue() || "";
          emit("update:modifiedValue", value);
        });
        originalModel.onDidChangeContent(() => {
          const value = modifiedModel?.getValue() || "";
          emit("update:originalValue", value);
        });
        // emit("editorDidMount", editorInstance.value);
      }
    };
    onMounted(() => {
      nextTick(() => {
        initMonaco();
      });
    });

    watch(readonly, (newVal, val) => {
      if(newVal.modified !== val.original || newVal.original !== val.original){
        if(editorInstance) {
          editorInstance.updateOptions({
            readOnly: newVal.modified,
            originalEditable: !newVal.original
          })
        }
      }
    })

    // 语言修改
    watch(
      () => props.language,
      (language) => {
        if (language && editorInstance && originalModel && modifiedModel) {
          monaco.editor.setModelLanguage(originalModel, language);
          monaco.editor.setModelLanguage(modifiedModel, language);
        }
      }
    );
    // originalValue
    watch(
      () => props.originalValue,
      (newVal) => {
        if (
          editorInstance &&
          originalModel &&
          newVal !== originalModel.getValue()
        ) {
          originalModel.setValue(newVal);
        }
      }
    );
    // originalValue
    watch(
      () => props.modifiedValue,
      (newVal) => {
        if (
          editorInstance &&
          modifiedModel &&
          newVal !== modifiedModel.getValue()
        ) {
          modifiedModel.setValue(newVal);
        }
      }
    );

    return () => {
      return <div ref={dom} style={style.value}></div>;
    };
  },
});
