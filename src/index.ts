/*
 * @Author: saber
 * @Date: 2022-03-09 10:57:39
 * @LastEditTime: 2022-03-10 19:16:20
 * @LastEditors: saber
 * @Description: 
 */
import MonacoEditor from './MonacoEditor.vue'
MonacoEditor.install = (app: any) => {
  app.component(MonacoEditor.name, MonacoEditor)
}
export default MonacoEditor