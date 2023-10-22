# Basic Authentication for Nodejs

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](http://prettier.io) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

## Description

A sample NodeJs application, demonstrating how to use JWT Authentication, with access tokens and refresh tokens.

## Installation

Development environment requirements:
- [Docker](https://www.docker.com) >= 17.06
- [Docker Compose](https://docs.docker.com/compose/install/)

## Project initialization

### 1. Installation

```bash
$ cp .env.dev .env
$ docker compose up -d --build
$ npm install
```

### 2. Running the migration

```bash
$ npm run migrate:run
```

### 3. Running the app

```bash
# development mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### 4. Running the test

```bash
# unit tests
$ npm run test

# integration tests
$ npm run test:integration

# e2e tests
$ npm run test:e2e
```

## Roadmap
  - Auth
    - [X] Authenticate user
    - [X] Refresh token
    - [X] Logout a user
    - [X] Forgot password
    - [X] Reset password
    - [ ] Add Redis cache
  - User
    - [X] Create a new user
    - [X] Update user
    - [X] Reset password
    - [X] Delete user
  - Platform
    - [X] Facebook
    - [X] Apple
    - [X] Google
    - [ ] Linkedin
    - [X] Github
  - Test
    - [ ] Unit
    - [ ] E2E
    - [ ] Integration
  - [X] Swagger

## Notes

### 1. Enable Git hooks

```bash
$ npx husky install
$ npx husky add .husky/commit-msg 'npm run commit-msg'
$ npx husky add .husky/pre-commit 'npm run pre-commit'
```

### 2. Why is my git pre-commit hook not executable by default?

- Because files are not executable by default; they must be set to be executable.

```bash
$ chmod ug+x .husky/*
$ chmod ug+x .git/hooks/*
```

### 3. Git commit

```bash
$ npm run commit
```

### 4. Project release

```bash
$ npm run release:patch // Patch release 0.1.0 -> 0.1.1
$ npm run release:minor // Minor release 0.1.1 -> 0.2.0
$ npm run release:major // Major release 0.2.0 -> 1.0.0
```

### 5. Project Structure

| Name                   | Description                                              |
|------------------------|----------------------------------------------------------|
| **src/**               | Source files                                             |
| **src/config/**        | Application configuration                                |
| **src/core/**          |                                                          |
| **src/db/**            | DB connect, migration, seed and etc.                     |
| **src/decorators/**    |                                                          |
| **src/helpers/**       |                                                          |
| **src/libs/**          | Library source code like a logger, schema, i18n and etc. |
| **src/middleware/**    | Contains all the middleware that we need                 |
| **src/modules/**       |                                                          |
| **src/providers/**     |                                                          |
| **src/templates/**     |                                                          |
| **src/utility-types/** |                                                          |
| **src/utils/**         | Common functions that would be used repetitively         |
| **build/**             | Compiled source files will be placed here                |
| **tests/**             | Test cases will be placed here                           |
| **tests/e2e/**         |                                                          |
| **tests/unit/**        | Unit Test cases will be placed here                      |
| **tests/integration/** | API routes (Integration) Test cases will be placed here  |

### 6. PullRequest

- [ ] This PR implements new feature, fix bug, or some other changes
- [ ] If PR is not ready to review mark it as Draft
- [ ] All commits in this PR should be by [conventional-commits](https://www.conventionalcommits.org/en/v1.0.0/)

### 7. [Production Best Practices: Security](https://expressjs.com/en/advanced/best-practice-security.html)

- Don’t use deprecated or vulnerable versions of Express
- Use TLS
- Use Helmet
- Use cookies securely
- Prevent brute-force attacks against authorization
- Ensure your dependencies are secure
- Avoid other known vulnerabilities
- Additional considerations

## Contribution

Happy to get your feedback, but also you are feel free to raise a pull request.

## License

This library is released under the MIT License.
