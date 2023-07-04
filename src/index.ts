/*
 * @Author: saber
 * @Date: 2022-03-09 10:57:39
 * @LastEditTime: 2023-07-03 21:16:04
 * @LastEditors: saber
 * @Description: 
 */
import MonacoEditor from './MonacoEditor.vue'
import MonacoDiffEditor from './MonacoDiffEditor'

MonacoEditor.install = (app: any) => {
  app.component(MonacoEditor.name, MonacoEditor)
  app.component(MonacoDiffEditor.name, MonacoDiffEditor)
}
export {
  MonacoEditor,
  MonacoDiffEditor
}
export default MonacoEditor