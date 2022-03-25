# Lista de Contatos App

## O que foi utilizado?

- NextJs: Utilizado para fazer o SSR e comunicação com o banco de dados em MongoDb
- Prisma: ORM Typescript para manipulação dos dados na base de dados
- Axios: Para comunicação entre client e server
- Typescript: Para realizar tipagens
- TailwindCss: Para facilitar e acelerar a estilização e brand do sistema usando CSS
- ContextApi: Para compartilhamento de dados entre componentes
- Internacionalização com i18n: Para tradução de escritas entre PT e EN.
- Framer Motion: Para animações de elementos html no reactJs
- Jest: Para os testes unitários
- Toastify: Para exibir notificações para o client
- Http Only Cookie: Estratégia utilizada para salvar os dados em cookie de uma maneira segura, evitando ataques como XSS.

## Deploy

O deploy foi realizado através da Vercel, em poucos cliques e sem precisar configurar muita coisa o sistema já está no ar e integrado com o github.

- Automaticamente, ao subir em dev faz o deploy em um link preview e quando é feito o merge na master automaticamente já roda o deploy, sem precisar configurar nada.

## O que eu faria a mais?

- Colocaria no processo de deploy:
  - Executar os testes unitários para serem rodados por lá.
  - Executaria o sonarQube para verificação de qualidade.
  - Rodaria o Snyk para controle de vulnerabilidades e segurança inteligente do projeto.
  - Usaria o Chromatic para realizar deploy do Storybook, focando no controle de UI.
- Utilizaria o Sentry para log e controle de erros
- Utilizaria o Optimizely ou Google Optimize para testes A/B.
- Utilizaria o HotJar para coletar dados e entender melhor o comportamento do cliente no site.
- Utilizaria Graphql, não importando se com Apollo, Relay ou React Query, de preferencia com Relay.
- Trocaria o ContextApi por um gerenciador de estado mas não utilizaria Redux, ficaria entre Relay e Zustand.
- Colocaria um switch para trocar de idioma sem ser direto pela barra de navegação e faria pegar automaticamente pelo browser do usuário.

<br />

## Rodando o sistema

Para utilizar o sistema basta na pasta do projeto rodar no terminal:

```
yarn install
yarn dev
```

Para ver a internacionalização acontecendo, basta alterar o endopoint colocando o EN na frente, exemplo:

```
Por padrão em PT: https://paga-leve-contacts.vercel.app/sign-in
Ficando assim: https://paga-leve-contacts.vercel.app/en/sign-in
```
