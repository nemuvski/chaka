# Chaka 🔥

This command provides for creating a *React.js* or *Next.js* project template.

The following boilerplate is used to create a project.

- React.js: [nemuvski/reactjs-boilerplate](https://github.com/nemuvski/reactjs-boilerplate)
- Next.js: [nemuvski/nextjs-boilerplate](https://github.com/nemuvski/nextjs-boilerplate)

If you have any problems about the template, please create an issue in the repository.


## Quick Overview

### Case: *React.js*

```bash
npx chaka my-react-app
cd my-react-app

yarn install
git init
```

### Case: *Next.js*

```bash
npx chaka -l next my-next-app
cd my-next-app

yarn install
git init
```

## Requirements

- `Node.js`
  - `>= 16.0` *recommended version*
- `npm`
  - `>= 7.0` *recommended version*
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

- `-l`, `--lib`
  - lib name
  - choices: **react**, **next**
  - default: **react**
- `-t`, `--tool`
  - tool name
  - choices: **vite**, **webpack**
  - default: **vite**
  - ⚠️ If `lib` option set **next**, `tool` option is ignored.
- `-v`, `--version`
  - output the version number
- `-h`, `--help`
  - display help for command
