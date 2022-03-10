/*
 * @Author: saber
 * @Date: 2022-03-10 21:15:03
 * @LastEditTime: 2022-03-10 21:15:04
 * @LastEditors: saber
 * @Description:
 */
import * as monaco from "monaco-editor";
// 提示
monaco.languages.registerCompletionItemProvider("sql", {
  triggerCharacters: ["."],
  provideCompletionItems(
    model: monaco.editor.ITextModel,
    position: monaco.Position,
    context: monaco.languages.CompletionContext,
    token: monaco.CancellationToken
  ) {
      return {
        // incomplete
        suggestions: []
      }
  },
});
