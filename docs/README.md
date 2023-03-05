This command provides for creating a *React.js* or *Next.js* project template.

The following boilerplate is used to create a project.

- React.js: [nemuvski/reactjs-boilerplate](https://github.com/nemuvski/reactjs-boilerplate)
- Next.js: [nemuvski/nextjs-boilerplate](https://github.com/nemuvski/nextjs-boilerplate)

If you have any problems about the template, please create an issue in the repository.


## Quick Overview

### Global installation

```bash
npm i -g chaka@latest
```

### `npx` command

#### Case: React.js

```bash
npx chaka@latest react my-app
cd my-app

yarn install
git init
```

#### Case: Next.js

```bash
npx chaka@latest next my-app
cd my-app

yarn install
git init
```


## Requirements

- `Node.js`
  - `>= 16.0` *recommended version*


## Usage

It's simple. 🍰

```
chaka [COMMAND]

[COMMAND]
  help   Display help for chaka.
  next   Create a Next.js project template
  react  Create a React.js project template
```

### Command: next

```
chaka next [PROJECT]
```

- `[PROJECT]`
  - project name (i.e. directory name)

### Command: react

```
chaka react [PROJECT]
```

- `[PROJECT]`
  - project name (i.e. directory name)
