/*
 * @Author: saber
 * @Date: 2022-03-11 11:33:54
 * @LastEditTime: 2022-03-14 19:16:07
 * @LastEditors: saber
 * @Description: 
 */
// TODO: 如何做到按需加载 修改 vite的插件
// 第一版本 先不考虑 按需
import * as monaco from "monaco-editor";
// import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

// enables our language workern right away, despite no schema
// import 'monaco-graphql';
import "./languages/sql/simpleComplete";
import "./languages/python/simpleComplete";
import "./languages/shell/simpleComplete";
import DraculaTheme from "./themes/Dracula";
import GitHubTheme from "./themes/GitHub";

monaco.editor.defineTheme('Dracula', DraculaTheme);
monaco.editor.defineTheme('GitHub', GitHubTheme)

export { monaco };
