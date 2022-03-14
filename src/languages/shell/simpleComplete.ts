/*
 * @Author: saber
 * @Date: 2022-03-10 21:15:03
 * @LastEditTime: 2022-03-14 19:15:43
 * @LastEditors: saber
 * @Description:
 */
import * as monaco from "monaco-editor";
import { language } from "./shell";

const SORT_TEXT = {
  Database: "0",
  Table: "1",
  Column: "2",
  Keyword: "3",
};

const keywords = [
  ...language.keywords,
  ...language.builtins
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
monaco.languages.registerCompletionItemProvider("shell", {
  triggerCharacters: ["."],
  provideCompletionItems(
    model: monaco.editor.ITextModel,
    position: monaco.Position,
    context: monaco.languages.CompletionContext,
    token: monaco.CancellationToken
  ) {
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
