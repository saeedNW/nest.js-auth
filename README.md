<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# nest.js-auth

The **nest.js-auth** project provides a hands-on example of implementing an authentication system using NestJS with TypeORM.
It demonstrates practical approaches to setting up user authentication, authorization, and secure API access within a NestJS application,
leveraging TypeORM for seamless integration with a relational database. TypeORM is used for defining and managing user and OTP entities,
as well as handling database interactions, making it easier to maintain data consistency and scalability.

## Table of Content

- [nest.js-auth](#nestjs-auth)
  - [Table of Content](#table-of-content)
  - [Prerequisites](#prerequisites)
  - [Installation and Setup](#installation-and-setup)
  - [Run Postgres and PgAdmin using docker](#run-postgres-and-pgadmin-using-docker)
    - [Run PostgreSQL service](#run-postgresql-service)
    - [Run PgAdmin service](#run-pgadmin-service)
      - [Create a New PostgreSQL Server and database](#create-a-new-postgresql-server-and-database)
  - [Compile and run the project](#compile-and-run-the-project)
  - [Technologies Used](#technologies-used)
  - [License](#license)
  - [Contributors](#contributors)

## Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [NestJS](https://nestjs.com/)
- [Docker](https://www.docker.com)
- [PostgreSQL](https://www.postgresql.org/)
- [pgAdmin](https://www.pgadmin.org/)

## Installation and Setup

In order to get this application up and running on your local machine, follow the
steps below.

1. Clone the repository from GitHub:

   ```shell
   git clone https://github.com/saeedNW/nest.js-auth.git
   ```

2. Navigate to the project directory:

   ```shell
   cd nest.js-auth
   ```

3. Install project dependencies:

   ```shell
   npm install
   ```

Note that the application default Listing port is `3000`.

## Run Postgres and PgAdmin using docker

To begin using this project, the first step is to install and run a **PostgreSQL** database. If you don't already have PostgreSQL installed, you can follow these instructions to set it up using Docker containers.

### Run PostgreSQL service

Using this command you can pull and run PostgreSQL database.

```bash
docker run -d \
  --name postgres_container \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=root \
  -p 5432:5432 \
  postgres
```

This command initiates a PostgreSQL container with username and password authentication (postgres/root).

### Run PgAdmin service

PgAdmin is the most popular and feature rich Open Source administration and development platform for PostgreSQL. Using this command you can pull and run PgAdmin.

```bash
docker run -d \
  --name pgadmin_container \
  -e PGADMIN_DEFAULT_EMAIL=admin@example.com \
  -e PGADMIN_DEFAULT_PASSWORD=admin \
  -p 8080:80 \
  --link postgres_container:postgres \
  dpage/pgadmin4
```

This command starts a pgAdmin container with management UI available at <http://localhost:8080>. Log in using the email and password you specified in the docker run command for pgAdmin (<admin@example.com>/admin).

#### Create a New PostgreSQL Server and database

To create a new PostgreSQL server in pgAdmin, follow these steps:

- In the left sidebar, under "Servers", right-click on "Servers" and select "Create" > "Server..."
- Fill in the following details:
  - **Name:** Give your server a name (localhost).
  - **Connection:** Fill in the following details:
    - **Host name/address:** `postgres` (this is the name of the PostgreSQL container)
    - **Port:** `5432`
    - **Username:** The username you specified when running the PostgreSQL container
    - **Password:** The password you specified when running the PostgreSQL container
- Click on the "Save" button.

Once the server is created, you’ll need to set up a database to enable the application’s connection.

- In the left sidebar, under "Servers", Open the newly created database and right-click on "databases" and select "Create" > "database"
- Fill in the following details:
  - **Database:** Give your database a name (For this project the name should be nestjs-auth).
- Click on the "Save" button.

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# build production
$ npm run build

# production mode
$ npm run start:prod
```

## Technologies Used

List of the major technologies and libraries used to build this application:

- Node.js & NestJS
- Typescript
- PostgreSQL
- TypeORM
- Docker

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

## Contributors

We would like to thank the following individuals who have contributed to the development of this application:

![avatar](https://images.weserv.nl/?url=https://github.com/erfanyousefi.png?h=150&w=150&fit=cover&mask=circle&maxage=5d)
‎ ‎ ‎ ![avatar](https://images.weserv.nl/?url=https://github.com/saeedNW.png?h=150&w=150&fit=cover&mask=circle&maxage=5d)

[**Erfan Yousefi - Supervisor and instructor of the nest.js programming course**](https://github.com/erfanyousefi/)

[**Saeed Norouzi - Back-end Developer**](https://github.com/saeedNW)
