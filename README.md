# Chaka 🔥

This command provides for creating a *React.js* or *Next.js* project template.

The following boilerplate is used to create a project.

- React.js: [nemuvski/reactjs-boilerplate](https://github.com/nemuvski/reactjs-boilerplate)
- Next.js: [nemuvski/nextjs-boilerplate](https://github.com/nemuvski/nextjs-boilerplate)

If you have any problems about the template, please create an issue in the repository.


## Quick Overview

### Case: *React.js*

```bash
npx chaka react my-app
cd my-app

yarn install
git init
```

### Case: *Next.js*

```bash
npx chaka next my-app
cd my-app

yarn install
git init
```


## Requirements

- `Node.js`
  - `>= 16.0` *recommended version*
- `npm`
  - `>= 7.0` *recommended version*


## Usage

It's simple. 🍰

```
chaka [COMMAND]

[COMMAND]
  help   Display help for chaka.
  next   Create a Next.js project template
  react  Create a React.js project template
```

### COMMAND: `next`

```
chaka next [PROJECT]
```

- `[PROJECT]`
  - project name (i.e. directory name)

### COMMAND: `react`

```
chaka react [PROJECT] [-t vite|webpack]
```

- `[PROJECT]`
  - project name (i.e. directory name)
- `[-t vite|webpack]`
  - build tool name
  - options: `vite|webpack`
  - default: `vite`
  
