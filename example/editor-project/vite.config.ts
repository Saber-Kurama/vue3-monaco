/*
 * @Author: saber
 * @Date: 2022-03-08 16:08:38
 * @LastEditTime: 2022-03-08 18:27:18
 * @LastEditors: saber
 * @Description: 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import monacoEditorPlugin from "vite-plugin-monaco-editor"
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),monacoEditorPlugin({
    languageWorkers: ['editorWorkerService', 'json']
  }), visualizer()]
})
