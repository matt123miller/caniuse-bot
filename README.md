# caniuse-bot

A monorepo for a simple but useful set of tools for interacting with the [Can I Use](https://caniuse.com/) data.

- [The core]('./core/README.md') :rocket:
- [The cli]('./cli/README.md') :computer:
- [Slack....one day]('./cli/README.md') :watch:

## TODO

Take a look at my [TODO list](./TODO) which is powered by the 
[TODO extension](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-todo-plus) for VSCode.
I'm a big fan of that extension.

## Publishing

Relies on [the np package](https://www.npmjs.com/package/np) installed globally. It's interactive so I go through it's menus. At the moment I'm running this in whichever folder I want to publish:

Preview first to check everything

`np --no-yarn --preview`

If I'm happy with the changes then do it for real. See the docs for details

`np --no-yarn`
