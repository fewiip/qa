# QA+:

QA+ é um projeto que visa utilizar a gamificação para auxiliar no ensino de teste e qualidade de software. Este é o repositório do front-end do projeto QA+, escrito usando react e typescript.

Para este projeto foram utilizados:
- __React:__ 18.2
- __Typescript:__ 5.1.4
- __Node.js:__ 18.18.2

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

Para compilar o projeto é só entrar na pasta do projeto e rodar o seguinte comando.

```
npm run build
```
 