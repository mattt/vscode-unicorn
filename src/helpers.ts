import * as vscode from 'vscode';

import { Character, getCharacters } from 'unidata';

const characters = getCharacters().reduce((map, character) => {
	map.set(character.code, character);
	return map;
}, new Map<Number, Character>())

export function codePoint(character: Character): string {
	return `U+${character.code.toString(16).padStart(4, "0").toUpperCase()}`
}

function rangeOfCharacterAtPosition(position: vscode.Position, document: vscode.TextDocument): vscode.Range {
	let start = position
	let end = document.validatePosition(position.translate(0, -1))
	if (start === end) {
		start = document.validatePosition(position.translate(0, +1))
	}

	return document.validateRange(new vscode.Range(start, end));
}

function lengthOfSelection(selection: vscode.Selection): number | undefined {
	if (!selection.isSingleLine) { return undefined }
	return selection.end.character - selection.start.character
}

export function currentCharacter(editor: vscode.TextEditor, selection: vscode.Selection = editor.selection): Character | undefined {
	if (!selection.isEmpty && lengthOfSelection(selection) != 1) {
		return undefined
	}

	let range: vscode.Range;
	if (lengthOfSelection(selection) === 1) {
		range = editor.document.validateRange(new vscode.Range(selection.start, selection.end));
	} else {
		range = rangeOfCharacterAtPosition(selection.active, editor.document)
	}

	const text = editor.document.getText(range);
	if (text.length === 0) {
		return undefined
	}

	const code = text.charCodeAt(text.length - 1);
	return characters.get(code) || undefined;
}

