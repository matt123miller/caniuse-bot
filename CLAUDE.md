# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A monorepo providing tools for interacting with [Can I Use](https://caniuse.com/) data. The `core` package wraps caniuse-api and is consumed by various front-ends (CLI, Discord bot, future Slack bot).

## Monorepo Structure

- **core/** - Core library (`caniuse-bot` on npm) - the shared logic for querying caniuse data
- **cli/** - CLI tool (`caniuse-cli`) - consumes the core package from npm
- **discord/** - Discord bot (work in progress) - uses discord.js, requires `.env` with TOKEN and CLIENTID
- **slack/** - Placeholder for future Slack bot

Each package has its own `package.json` and `tsconfig.json`. There is no workspace manager (lerna/npm workspaces) - packages are independent and the CLI/Discord packages install `caniuse-bot` from npm.

## Common Commands

### Core Package (core/)
```bash
bun run build     # Compile TypeScript
bun test          # Run Bun tests
bun run watch     # TypeScript watch mode
```

### CLI Package (cli/)
```bash
bun run build     # Compile TypeScript
bun run start     # Build and run
```

### Discord Package (discord/)
```bash
bun run build     # Compile TypeScript
bun run start     # Requires DOTENV_CONFIG_PATH=.env with TOKEN and CLIENTID
```

## Architecture

### Core Package
The main export is `searchForFunctionality(feature: string)` which:
- Returns `GatheredOutputData` (with `fullSupport`, `partialSupport`, `noSupport` objects) when a unique feature is found
- Returns `string[]` of options when the search term is ambiguous (e.g., "grid" returns ["css-grid", "css-subgrid"])
- Throws on empty string input

Key files:
- `searchForFunctionality.ts` - Main search logic wrapping caniuse-api
- `defaultSupportedBrowsers.ts` - Default browser list (Firefox, Chrome, IE, Edge, Safari)
- `Interfaces.ts` - TypeScript interfaces (`BrowserData`, `OutputData`, `GatheredOutputData`)

### CLI Package
Uses Commander.js for CLI parsing and cli-table3 for output formatting. The CLI command is `ciu <feature>`.

## Publishing

Uses [np](https://www.npmjs.com/package/np) (must be installed globally):
```bash
np --no-yarn --preview  # Preview release
np --no-yarn            # Publish
```

## Linting

ESLint with TypeScript plugin configured at root level (`.eslintrc.json`).
