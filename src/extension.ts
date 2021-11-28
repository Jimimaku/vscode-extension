/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as vscode from 'vscode';
import SnykExtension from './snyk/extension';

import { LanguageClient, LanguageClientOptions, ServerOptions } from 'vscode-languageclient/node';
import { workspace } from 'vscode';

let client: LanguageClient;

const extension = new SnykExtension();

export function activate(context: vscode.ExtensionContext): void {
  console.log('Activating SnykExtension');
  void extension.activate(context);
  // The server is implemented in node
  const serverModule = '/Users/bdoetsch/workspace/go/bin/snyk-lsp';

  // If the extension is launched in debug mode then the debug server options are used
  // Otherwise the run options are used
  const serverOptions: ServerOptions = {
    command: serverModule,
  };

  // Options to control the language client
  const clientOptions: LanguageClientOptions = {
    // Register the server for plain text documents
    documentSelector: [{ scheme: 'file', language: '' }],
    synchronize: {
      // Notify the server about file changes to '.clientrc files contained in the workspace
      fileEvents: workspace.createFileSystemWatcher('**/*'),
    },
  };

  // Create the language client and start the client.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  client = new LanguageClient('Snyk LSP', 'Language Server Example', serverOptions, clientOptions);

  // Start the client. This will also launch the server
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  client.start();
}

export function deactivate(): void {
  console.log('Deactivating SnykExtension');
  void extension.deactivate();
  if (!client) {
    return undefined;
  }
  client.stop();
}

export function getExtension(): SnykExtension {
  return extension;
}
