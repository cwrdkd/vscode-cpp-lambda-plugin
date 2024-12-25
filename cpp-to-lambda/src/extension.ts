import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.convertToLambda', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selection = editor.selection;
            const text = editor.document.getText(selection);
            const lambdaCode = convertToLambda(text);

            editor.edit(editBuilder => {
                editBuilder.replace(selection, lambdaCode);
            });
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}

function convertToLambda(code: string): string {
    const trimmed = code.trim();
    return `[&]() { ${trimmed} }`;
}
