/*
 * @Author: saber
 * @Date: 2022-03-08 16:08:38
 * @LastEditTime: 2022-03-09 14:21:45
 * @LastEditors: saber
 * @Description:
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import monacoEditorPlugin from "vite-plugin-monaco-editor";
import { visualizer } from "rollup-plugin-visualizer";

import { nodeResolve } from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import rollupMonaco from "rollup-plugin-monaco-editor";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
      monacoEditorPlugin({
      // languageWorkers: ['editorWorkerService', 'json']
    }),
    // postcss(),
    // rollupMonaco({
    //   languages: ['json'],
    // }),
    // nodeResolve(),
    // commonjs(),
    // visualizer()
  ],
});
