## Debug
Run `npm run debug` and then attach vscode debugger with the following config:
```
{
    "type": "pwa-node",
    "request": "attach",
    "name": "Launch FRONT",
    "port": 9229,
    "restart": true,
    "skipFiles": [
        "<node_internals>/**"
    ],
    "sourceMaps": true,
    "resolveSourceMapLocations": [
        "${workspaceFolder}/**",
        "!**/node_modules/**"
    ]
}
```
