<p>
  <a href="https://7code.ro/" target="blank"><img src="https://avatars.githubusercontent.com/u/41831998" height="100" alt="7Code Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) + [Prisma](https://github.com/prisma/prisma) + [TypeScript](https://github.com/microsoft/TypeScript) starter repository.

### Production-ready REST API:
* Error Handling (Exception Filters)
* Logging System
* DB Seeds/Migrations
* Built-in AuthModule, using JWT. Route Guards
* Model Events Listener (onCreated, …)
* Deployable. CI/CD pipeline using Github Actions.
* Advanced ESLint/TSLint config. (e.g: auto-fix will remove unused imports)
* Shared services/constants/helpers
* Middlewares/Interceptors implementation example.

## TO-DO
* Add Mail Service 
* Add [Recap.DEV](https://recap.dev/) integration - Tracing/Monitoring service
* Add Unit tests.
* Add Social Media Auth
* Add documentation for setting the GitHub Secrets for the CI/CD pipeline
* Add API Throttling - https://docs.nestjs.com/security/rate-limiting
* ...

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Prisma (ORM)
```bash
# IDE for your database
$ npx prisma studio 

# run migrations (apply schema changes)
$ npx prisma migrate dev

# run migrations on CI/CD
$ npx prisma migrate deploy

# apply db schema changes to the prisma client
$ npx prisma generate
```

## Code Style
Sync your IDE with project eslintrc.js. 

Check `Run ESLint --fix on save`

## Stay in touch

- Author - [Igor Mardari](https://www.linkedin.com/in/igor-mardari-7code/) | [GarryOne](https://github.com/GarryOne)
- Website - [7code.ro](https://7code.ro/)
- Github - [@7codeRO](https://github.com/7codeRO/)

## License

  [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
