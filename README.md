# `blue bank.`

## Começando

Para começar você só tem que clonar o repositório e instalar suas dependências:

### Pre-requisitos

`Git` para clonar o repositório;
`Node.js` devido às ferramentas para inicializar e testar o projeto.
É necessário também o gerenciador de pacotes `npm`.

### Clonar 

Clone o repositório usando git:

```
git clone https://github.com/dangregory/bluebank.git
cd bluebank
```


### Instalar as Dependências

Para instalar as dependências, o `npm` foi pré-configurado para rodar o bower automaticamente, dessa forma basta executar:

```
npm install
```

Esse comando chamará também o `bower install`. A pasta `bower_components` que normalmente fica no root do projeto, é criada na pasta `app` para facilitar o "serve" pelo webserver.


### Rodar a Aplicação

Esse projeto já está pré-configurado com um webserver de desenvolvimento local. É uma ferramenta Noje.js chamada [http-server][http-server]. Você pode rodar o projeto com esse webserver rodando um:


```
npm start
```

Agora basta ir para [`localhost:8000/index.html`][local-app-url].


### Instruções para Login

Foi criada uma api através do [Apiary][apiary] para ser consumida pelo frontend. Dessa forma, para logar no sistema, é feita uma autenticação através do `id` do usuário. Portanto, é necessário utilizar um dos seguintes `id's`:

```
Nome: João, ID: 123456
Nome: Maria, ID: 123457
Nome: José, ID: 123458
Nome: Watson, ID: 123459
Nome: Ana, ID: 123450
```
Como a autenticação checa somente o `id`, os outros campos não foram marcados como `required`.   



# Blue Bank - Estamos contratando!


**Blue Bank** é uma instituição financeira fictícia cujas demandas de desenvolvimento de software têm aumentado muito nos últimos meses. Tentando manter-se sempre atualizada, busca novos desenvolvedores de software que sejam capazes de solucionar problemas de forma eficaz e elegante.

Como candidato, seu objetivo é desenvolver uma aplicação que seja capaz de demonstrar seus conhecimentos em desenvolvimento frontend e backend, ou seja, provar ser um legítimo desenvolvedor Fullstack.

Para isso será necessário criar uma aplicação que possibilite a transferência de fundos entre contas de dois correntistas.

## Informações importantes sobre o negócio
Um correntista é identificado pelo seu id, CPF, número da conta corrente e código da agência.

As transferências devem ter controle transacional para evitar débitos e créditos inválidos.

A existência da conta de destino deve ser validada, assim como a existência de fundos suficientes para o valor a ser transferido.

## Requisitos técnicos
- Interface web.
- Backend Java EE ou NodeJs.
- Utilizar OOP.
- Banco de dados relacional com ORM (Lembre-se que a legislação obriga os bancos a manter dados históricos por anos).
- Instruções para deploy e execução.
- Pequeno memorando com justificativa de decisões técnicas.

## Como destacar-se?
- Aplicar SOLID.
- Escrever testes unitários com boa cobertura.
- Arquitetar com SPA + API.
- Fazer o deploy da aplicação no seu ambiente de nuvem preferido ([IBM Bluemix](https://console.ng.bluemix.net/), AWS, Openshift, Heroku).


## Frameworks são bem vindos!
Angular, jQuery, Bootstrap, Material, ModuleJs, Sequelize, Spring, Hibernate.

## Como enviar o código para análise?
O desenvolvedor deve criar um projeto no seu Git repo preferido (GitHub, BitBucket, etc). Lembre-se que ele será analisado por desenvolvedores, então não economize nos comentários de commit.



[apiary]: https://apiary.io/
[local-app-url]: http://localhost:8000/index.html
[http-server]: https://github.com/indexzero/http-server
