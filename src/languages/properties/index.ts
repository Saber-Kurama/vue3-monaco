import * as monaco from "monaco-editor";

// Register a new language
monaco.languages.register({ id: "properties" });

// Register a tokens provider for the language
monaco.languages.setMonarchTokensProvider("properties", {
  tokenizer: {
    root: [
      [/^\#.*/, "comment"],
      [/.*\=/, "key"],
      [/^=.*/, "value"],
    ],
  },
});

// Define a new theme that contains only rules that match this language
monaco.editor.defineTheme("properties", {
  base: "vs",
  inherit: false,
  rules: [
    { token: "key", foreground: "009968" },
    { token: "value", foreground: "009968" },
    { token: "comment", foreground: "666666" },
  ],
  colors: {
    "editor.foreground": "#000000",
  },
});

monaco.languages.registerCompletionItemProvider("properties", {
  triggerCharacters: ["."],
  provideCompletionItems(
    model: monaco.editor.ITextModel,
    position: monaco.Position,
    context: monaco.languages.CompletionContext,
    token: monaco.CancellationToken
  ) {
    const word = model.getWordUntilPosition(position);
		const range = {
			startLineNumber: position.lineNumber,
			endLineNumber: position.lineNumber,
			startColumn: word.startColumn,
			endColumn: word.endColumn,
		};
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
        // ...getKeywordSuggest()
        // {
        //   label: "simpleText",
        //   kind: monaco.languages.CompletionItemKind.Text,
        //   insertText: "simpleText",
				//   range: range,
        // },
        // {
        //   label: "testing",
        //   kind: monaco.languages.CompletionItemKind.Keyword,
        //   insertText: {
        //     value: "testing(${1:condition})",
        //   },
        //   insertTextRules:
				// 	monaco.languages.CompletionItemInsertTextRule
				// 		.InsertAsSnippet,
        //   range: range,
        // },
        // {
        //   label: "ifelse",
        //   kind: monaco.languages.CompletionItemKind.Snippet,
        //   insertText: [
        //     "if (${1:condition}) {",
        //     "\t$0",
        //     "} else {",
        //     "\t",
        //     "}",
        //   ].join("\n"),
        //   insertTextRules:
        //     monaco.languages.CompletionItemInsertTextRule
        //       .InsertAsSnippet,
        //   documentation: "If-Else Statement",
        //   range: range,
        // },
      ],
    };
  },
  // provideCompletionItems: () => [
  //   {
  //     label: 'simpleText',
  //     kind: monaco.languages.CompletionItemKind.Text,
  //   },
  //   // {
  //   //   label: 'testing',
  //   //   kind: window.monaco.languages.CompletionItemKind.Keyword,
  //   //   insertText: {
  //   //     value: 'testing(${1:condition})',
  //   //   },
  //   // },
  //   // {
  //   //   label: 'ifelse',
  //   //   kind: window.monaco.languages.CompletionItemKind.Snippet,
  //   //   insertText: {
  //   //     value: ['if (${1:condition}) {', '\t$0', '} else {', '\t', '}'].join('\n'),
  //   //   },
  //   //   documentation: 'If-Else Statement',
  //   // },
  // ],
});
