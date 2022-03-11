/*
 * @Author: saber
 * @Date: 2022-03-10 21:15:03
 * @LastEditTime: 2022-03-11 10:19:43
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
    const word = "SELECT";
    const index = 0;
    const wordInfo = model.getWordUntilPosition(position);
    const wordRange = new monaco.Range(
      position.lineNumber,
      wordInfo.startColumn,
      position.lineNumber,
      wordInfo.endColumn
    );
    return {
      // incomplete
      suggestions: [
        {
          label: word,
          kind: monaco.languages.CompletionItemKind.Keyword,
          detail: "关键字",
          insertText: word + " ",
          sortText: "1000" + index + word,
          filterText: word.toLowerCase(),
          range: wordRange
        },
      ],
    };
  },
});
