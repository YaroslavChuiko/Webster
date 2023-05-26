<head>
    <div align="center">
        <h1 align="center">Webster (Server)</h1>
    </div>
</head>

<div align="center">
  <img alt="Node.js" src="https://img.shields.io/badge/-Nodejs-339933.svg?style=for-the-badge&logo=node.js&logoColor=white" />
  <img alt="nestjs" src="https://img.shields.io/badge/-nestjs-E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white" />
  <img alt="postgresql" src="https://img.shields.io/badge/-postgresql-4169E1.svg?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img alt="Prisma" src="https://img.shields.io/badge/-Prisma-2D3748.svg?style=for-the-badge&logo=prisma&logoColor=white" />
  <img alt="Passport JWT" src="https://img.shields.io/badge/-passport%20JWT-34E27A.svg?style=for-the-badge&logo=passport&logoColor=white" />
  <img alt="Nodemon" src="https://img.shields.io/badge/-Nodemon-76D04B.svg?style=for-the-badge&logo=nodemon&logoColor=white" />
  <img alt=".ENV" src="https://img.shields.io/badge/-.ENV-ECD53F.svg?style=for-the-badge&logo=.ENV&logoColor=black" />
</div>

</br>

## About

A graphic-design application, written in NestJS, with the use of PostgreSQL, Prisma.

## Setup & Run

Prior to setup, create an `.env` file based on the `.env.example` file, and fill in the required vars.

## Installation

```bash
# in the `server/` directory
$ yarn install
$ psql 'hostname'
$ CREATE DATABASE 'DB-NAME'
$ yarn run prisma:prepare
$ yarn run migrate:dev
```

## Running the app

```bash
# development
$ yarn run dev
```

You can now access the API, using the port, provided in the `.env` file.

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
