# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list



#__To do:__

__20/03__
- Cadastro (feito!)
- Tela principal (feito!)
- Quadro de lideres (feito!)
- Minha estatisticas (feito!)

__27/03:__
- Proximas conquistas 
- Lições liberadas (feito!)
- visualizar as unidades (feito!)
- começar uma tela de perfil (feito!)
- Menu de navegação (feito!)

__03/04:__
- tela do quiz (feito!)
- Desafio do dia 

__10/04:__
- editor de quiz 
- editor de markdown para as aulas (feito!)
- tela de conclusao de conteudo 
- tela de perfil (feito!)

__17/04:__
- mostrar dados da conta (feito!)
- minhas estatisticas (feito!)
- troca de dados da conta 

- troca de senha

- criar classe (feito!)
- editar classe (feito!)

- criar lição (feito!)
- editar lição (feito!)

- criar quiz (feito!)
- editar quiz (feito!)

__24/04:__

__01/05:__


- criasse as turmas (cada turma tem que ter um codigo)

endereço da API:
http://193.123.119.217:8080/swagger-ui/index.html#/

__Ideias:__
- previous mistake (permitir refazer uma questão que o aluno errou, do duolinguo)

__usando os pacotes__
- react-markdown 
- remark-breaks
- lottie-react
