#QA+:

QA+ é um projeto que visa utilizar a gamificação para auxiliar no ensino de teste e qualidade de software. Este é o repositório do front-end do projeto QA+, escrito usando react e typescript.

Para este projeto foram utilizados:
- __React:__ 18.2
- __Typescript:__ 5.1.4

Para poder testar o codigo é necessario ter o Node.js instalado em sua máquina. Pagina de download do Noje.ds:
https://nodejs.org/en


__Como rodar o codigo localmente?__
É necessario fazer um 'clone' do repositorio 
```
git clone https://github.com/fewiip/qa.git
```

Após isso, é necessário adicionar um arquivo .env a pasta local do projeto, nele está o endereço do back-end, abaixo segue um exemplo:
```
VITE_API_URL=http://123.123.123.123:8080/api/v1
```

Também é necessario rodar apenas uma vez este comando, ele instalará as depedencias do projeto:
```
npm install
```


Após isso, o front-end estará pronto para rodar. Toda vez que quiser testar, entre na pasta do projeto e rode o seguinte comando:
```
npm run dev -- --host
```

__Como compilar?__
```
npm run build
```


#__To do:__

__20/03__
- Cadastro (feito!)
- Tela principal (feito!)
- Quadro de líderes (feito!)
- Minha estatisticas (feito!)

__27/03:__
- Proximas conquistas 
- Lições liberadas (feito!)
- visualizar as unidades (feito!)
- começar uma tela de perfil (feito!)
- Menu de navegação (feito!)

__03/04:__
- tela do quiz (feito!)

__10/04:__
- editor de quiz (feito!)
- editor de markdown para as aulas (feito!)
- tela de conclusao de conteúdo (feito!)
- tela de perfil (feito!)

__17/04:__
- mostrar dados da conta (feito!)
- minhas estatisticas (feito!)
- troca de dados da conta (feito!)

- troca de senha (feito!)

- criar classe (feito!)
- editar classe (feito!)

- criar lição (feito!)
- editar lição (feito!)

- criar quiz (feito!)
- editar quiz (feito!)

__Não foi possível implementar:__
- Desafio do dia 
- Estatisticas da turma

__Ideias:__
- previous mistake (permitir refazer uma questão que o aluno errou, do duolinguo)

__usando os pacotes__
- react-markdown 
- remark-breaks
- lottie-react
