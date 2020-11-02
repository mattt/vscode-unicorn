import * as vscode from 'vscode';
import { Character } from 'unidata';
import { currentCharacter, codePoint } from './helpers';

let lastCharacter: Character;

let statusBarItem: vscode.StatusBarItem;

export function activate({ subscriptions }: vscode.ExtensionContext) {
	// register a command that is invoked when the status bar
	// item is selected
	const command = "com.mattt.unicorn.command";
	subscriptions.push(vscode.commands.registerCommand(command, (event) => {
		const character = lastCharacter;
		if (!character) { return }

		// vscode.window.showInformationMessage(`${character.name}`);

		const panel = vscode.window.createWebviewPanel(
			"characterInformation",
			`${character.name} (${codePoint(character)})`,
			vscode.ViewColumn.One
		);

		panel.webview.html = webViewContents(character);
	}));

	// create a new status bar item that we can now manage
	statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	statusBarItem.command = command;
	subscriptions.push(statusBarItem);

	// register some listener that make sure the status bar
	// item always up-to-date
	subscriptions.push(vscode.window.onDidChangeActiveTextEditor((editor) => {
		if (!editor) { return }
		updateStatusBarItem(editor, editor?.selection)
	}));

	subscriptions.push(vscode.window.onDidChangeTextEditorSelection((event) => {
		if (event.selections.length != 1) { return }
		updateStatusBarItem(event.textEditor, event.selections[0])
	}));
}

function updateStatusBarItem(editor: vscode.TextEditor, selection: vscode.Selection = editor.selection): void {
	const character = currentCharacter(editor, selection);
	if (character) {
		lastCharacter = character;
		statusBarItem.text = `$(globe) ${character.name} (${codePoint(character)})`
		statusBarItem.show();
	} else {
		statusBarItem.hide();
	}
}

function webViewContents(character: Character): string {
	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<style>
		header {
			display: grid;
			grid-template-columns: 1fr 2fr;
		}

		#specimen span {
			font-size: 5em;
			border: 3px #ccc dashed;
			border-radius: 5px;
			display: block;
			width: auto;
			padding: 1rem;
			text-align: center;
			min-height: 1em
		}

		#code-points pre {
			font-size: 2em;
		}

		small {
			display: block;
		}

		table th {
			text-align: right;
			padding-right: 1em;
		}
	</style>
</head>
<body>
	<header>
		<figure id="specimen">
			<span>${String.fromCharCode(character.code)}</span>
		</figure>

		<h1>
			<small>${codePoint(character)}</small>
			${character.name}
		</h1>
	</header>

	<section id="code-points">
		<pre>UTF-16: ${[...String.fromCharCode(character.code)].flatMap(codePoint => (
		codePoint.codePointAt(0)?.toString(16).padStart(4, "0").toUpperCase()
	)).join(" ")}</pre>
	</section>

	<section>
		<h2>Properties</h2>
		<table>
			<tbody>
				<tr>
					<th>General Category</th>
					<td>${character.cat}</td>
				</tr>
				<tr>
					<th>Canonical Combining Class</th>
					<td>${character.comb || "not reordered"}</td>
				</tr>
				<tr>
					<th>Bidirectional Category</th>
					<td>${character.bidi || "<em>N/A</em>"}</td>
				</tr>
				<tr>
					<th>Mirrored in Bidirectional Text</th>
					<td>${character.bidiMirror ? "true" : "false"}</td>
				</tr>
				<tr>
					<th>Numeric Value</th>
					<td>${character.num || "<em>N/A</em>"}</td>
				</tr>
				<tr>
					<th>Decomposition Type</th>
					<td>${character.decompType || "<em>N/A</em>"}</td>
				</tr>
				<tr>
					<th>Lowercase Mapping</th>
					<td>${character.lower ? String.fromCharCode(character.lower) : ""}</td>
				</tr>
				<tr>
					<th>Uppercase Mapping</th>
					<td>${character.upper ? String.fromCharCode(character.upper) : ""}</td>
				</tr>
			</body>
		</table>
	</section>
</body>
</html>`;
}
