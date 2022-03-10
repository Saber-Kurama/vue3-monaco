/*
 * @Author: saber
 * @Date: 2022-03-10 21:44:09
 * @LastEditTime: 2022-03-10 21:59:50
 * @LastEditors: saber
 * @Description: 
 */
// https://github.com/microsoft/monaco-editor/blob/main/src/basic-languages/sql/sql.ts
// https://microsoft.github.io/monaco-editor/monarch.html
// 定义一个语言

import type { languages } from 'monaco-editor';
// 语言的配置
export const conf: languages.LanguageConfiguration = {
	comments: {
		lineComment: '--',
		blockComment: ['/*', '*/']
	},
	brackets: [
		['{', '}'],
		['[', ']'],
		['(', ')']
	],
	autoClosingPairs: [
		{ open: '{', close: '}' },
		{ open: '[', close: ']' },
		{ open: '(', close: ')' },
		{ open: '"', close: '"' },
		{ open: "'", close: "'" }
	],
	surroundingPairs: [
		{ open: '{', close: '}' },
		{ open: '[', close: ']' },
		{ open: '(', close: ')' },
		{ open: '"', close: '"' },
		{ open: "'", close: "'" }
	]
};