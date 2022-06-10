# spelGo Docs

Descrição dos endpoints da API do spelGo.

## GET `/words`

 - Retorna um array contendo todas as palavras cadastradas
 - Não precisa de autenticação

```json
// Retorno do endpoint
// STATUS: 200 - OK
{
  "lang": "pt-BR",
  "words": ["Jesus", "Maria", "Lucas"] // Todas as palavras cadastradas
}
```

## POST `/Words`

 - Recebe um array de palavras a serem inseridas
 - É necessário possuir um token válido para autenticação
 - Retorna um array com as palavras adicionadas

```json
// Corpo da requisição
{
  "palavras": ["Canaã", "Tempo", "Jonas", "Canaã"]
}

// Headers
{
  "authentication": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
  // Token proveniente da rota de Login
}
```

```json
// Retorno do endpoint
// STATUS: 201 - CREATED
{
  "addedWords": ["Canaã", "Tempo", "Jonas"]
}
```

## Delete `/words/:word`

 - Exclui a palavra passada pelo endpoint
 - É necessário possuir um token válido para autenticação
 - Não gera retornos

```json
// Headers
{
  "authentication": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
  // Token proveniente da rota de Login
}
```

## POST `/login`

 - Retorna um token de acesso ao banco de dados
 - Recebe um objeto `.json` com as propriedades `nome` e `senha`

```json
// Corpo da requisição
{
  "nome": "spelGo",
  "senha": "Termo_crente123"
}
```

```json
// Retorno do endpoint
// STATUS: 200 - OK
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
  }
```

## POST `/admin`

 - Cadastra um novo administrador
 - Recebe um objeto `.json` com as propriedades `nome` e `senha`
 - É necessário possuir um token válido para autenticação
 - Não gera retornos

```json
// Corpo da requisição
{
  "nome": "spelGo",
  "senha": "Termo_crente123"
}

// Headers
{
  "authentication": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
  // Token proveniente da rota de Login
}
```

Voltar para o [início](#spelgo-docs).
Voltar para o [readme](../README.md).
