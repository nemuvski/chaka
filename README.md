# Chaka 🔥

This command builds a project for a React.js application.

The project template makes use of [nemuvski/reactjs-boilerplate](https://github.com/nemuvski/reactjs-boilerplate).

This is just for personal use. 😉

## Quick Overview

```bash
npx chaka my-app
cd my-app

# Do the following as needed.
yarn install
git init
```

## Requirements

- `Node.js`
  - `>= 16.0`
- `npm`
  - `>= 7.10`
- `git`

## Command Usage

It's simple. 🍰

```bash
chaka [options] <project-name>
```

The following are examples of usage.

```bash
chaka my-app
chaka -t vite my-app
chaka -t webpack my-app
```

### Arguments

- `<project-name>`
  - i.e. directory name

### Options

- `-t`, `--tool`
  - tool name
  - choices: **vite**, **webpack**
  - default: **vite**
- `-v`, `--version`
  - output the version number
- `-h`, `--help`
  - display help for command
