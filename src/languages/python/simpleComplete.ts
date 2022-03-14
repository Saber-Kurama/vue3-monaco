/*
 * @Author: saber
 * @Date: 2022-03-10 21:15:03
 * @LastEditTime: 2022-03-14 19:10:50
 * @LastEditors: saber
 * @Description:
 */
import * as monaco from "monaco-editor";
import { language } from "./python";

const SORT_TEXT = {
  Database: "0",
  Table: "1",
  Column: "2",
  Keyword: "3",
};

const keywords = [
  ...language.keywords,
];
const getKeywordSuggest = (): monaco.languages.CompletionItem[] => {
  return keywords.map((keyword) => {
    return {
      label: keyword,
      kind: monaco.languages.CompletionItemKind.Keyword,
      detail: "关键字",
      insertText: keyword + " ",
      sortText: "1000" + SORT_TEXT.Keyword + keyword,
      filterText: keyword.toLowerCase(),
      // range: wordRange
    } as monaco.languages.CompletionItem;
  });
};
// 提示
monaco.languages.registerCompletionItemProvider("python", {
  triggerCharacters: ["."],
  provideCompletionItems(
    model: monaco.editor.ITextModel,
    position: monaco.Position,
    context: monaco.languages.CompletionContext,
    token: monaco.CancellationToken
  ) {
    // const word = "SELECT";
    // const index = 0;
    // const wordInfo = model.getWordUntilPosition(position);
    // const wordRange = new monaco.Range(
    //   position.lineNumber,
    //   wordInfo.startColumn,
    //   position.lineNumber,
    //   wordInfo.endColumn
    // );
    return {
      // incomplete
      suggestions: [
        // {
        //   label: word,
        //   kind: monaco.languages.CompletionItemKind.Keyword,
        //   detail: "关键字",
        //   insertText: word + " ",
        //   sortText: "1000" + index + word,
        //   filterText: word.toLowerCase(),
        //   range: wordRange,
        // },
        ...getKeywordSuggest()
      ],
    };
  },
});
