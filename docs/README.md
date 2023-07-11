A Node CLI that generates minimal project templates of modern web development.

The following project template is used to create a project.

- React.js: [nemuvski/reactjs-boilerplate](https://github.com/nemuvski/reactjs-boilerplate)
- Next.js: [nemuvski/nextjs-boilerplate](https://github.com/nemuvski/nextjs-boilerplate)
- Remix.js: [nemuvski/remixjs-boilerplate](https://github.com/nemuvski/remixjs-boilerplate)
- Gatsby.js: [nemuvski/gatsbyjs-boilerplate](https://github.com/nemuvski/gatsbyjs-boilerplate)
- Svelte.js: [nemuvski/sveltejs-boilerplate](https://github.com/nemuvski/sveltejs-boilerplate)

If you have any problems about project templates, please create an issue in the repository.


## Quick Overview

### Global installation

```bash
npm i -g chaka@latest
```

### npx command

#### Case: React.js

```bash
npx chaka@latest react my-app
cd my-app

npm install
git init
```

#### Case: Next.js

```bash
npx chaka@latest next my-app
cd my-app

npm install
git init
```

#### Case: Remix.js

```bash
npx chaka@latest remix my-app
cd my-app

npm install
git init
```

#### Case: Gatsby.js

```bash
npx chaka@latest gatsby my-app
cd my-app

npm install
git init
```

#### Case: *Svelte.js*

```bash
npx chaka@latest svelte my-app
cd my-app

npm install
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
  react  Create a React.js project template
  next   Create a Next.js project template
  remix   Create a Remix.js project template
  gatsby  Create a Gatsby.js project template
  svelte  Create a Svelte.js project template
```

### COMMAND: react

```
chaka react [PROJECT]
```

- `[PROJECT]`
  - project name (i.e. directory name)

### COMMAND: next

```
chaka next [PROJECT]
```

- `[PROJECT]`
  - project name (i.e. directory name)

### COMMAND: remix

```
chaka remix [PROJECT]
```

- `[PROJECT]`
  - project name (i.e. directory name)

### COMMAND: gatsby

```
chaka gatsby [PROJECT]
```

- `[PROJECT]`
  - project name (i.e. directory name)

### COMMAND: svelte

```
chaka svelte [PROJECT]
```

- `[PROJECT]`
  - project name (i.e. directory name)
