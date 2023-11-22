# Executando um Projeto Angular

Passos para Execução

##1.Instalar Dependências:
npm install
##2.Rodar o Projeto:
ng serve

O aplicativo estará disponível em http://localhost:4200/. Abra este URL no seu navegador.

# Alteração no Arquivo ApolloLink.d.ts

## Descrição da Alteração

A alteração realizada no arquivo `ApolloLink.d.ts` está relacionada ao tipo do método `split`. A seguir, é apresentada a alteração realizada:
obs: linha: 7
```diff
- static split(test: (op: Operation) => boolean, left: ApolloLink | RequestHandler, right?: ApolloLink | RequestHandler): ApolloLink;
+ static split(test: (op: Operation) => boolean, left: any, right?: any): ApolloLink;
```
Nesta alteração, o tipo dos parâmetros left e right foi alterado para any.

Localização do Arquivo
O arquivo ApolloLink.d.ts está localizado no seguinte caminho:

node_modules\@apollo\client\link\core\ApolloLink.d.ts
