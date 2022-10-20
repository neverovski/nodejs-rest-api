# Auth

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](http://prettier.io) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)


### Before starting - dev stage
```bash
$ cp .env.example .env
$ docker-compose up -d --build
$ npm run start:dev
```

### Before starting - prod stage
```bash
$ cp .env.example .env
$ docker-compose up -d --build
$ npm run build && npm run start:prod
```

## Creating a migration
```bash
$ npm run migrate:create --name=<NAME>
```

## Next steps
  - Auth
    - [X] Authenticate user
    - [X] Refresh token
    - [X] Logout a user
    - [X] Forgot password
    - [X] Reset password
  - User
    - [X] Create a new user
    - [X] Update user
    - [X] Reset password
    - [X] Delete user
  - Platform
    - [X] Facebook
    - [X] Apple
    - [X] Google
    - [ ] Twitter
    - [ ] Linkedin
    - [X] Github
  - Test
    - [ ] Unit
    - [ ] E2E
    - [ ] Integration
  - [X] Swagger

## Project Structure

| Name                   | Description                                             |
|------------------------|---------------------------------------------------------|
| **src/**               | Source files                                            |
| **src/config/**        | Application configuration                               |
| **src/core/**          | Reusable utilises and library source code like a logger |
| **src/db/**            | DB connect and migration                                |
| **src/middleware/**    | Express Middlewares like error handler feature          |
| **src/modules/**       | Express Middlewares like error handler feature          |
| **src/providers/**     | Express Middlewares like error handler feature          |
| **src/utils/**         | Express Middlewares like error handler feature          |
| **src/utils/helpers/** | Express Middlewares like error handler feature          |
| **build/**             | Compiled source files will be placed here               |
| **tests/**             | Test cases will be placed here                          |
| **tests/unit/**        | Unit Test cases will be placed here                     |
| **tests/integration/** | API routes (Integration) Test cases will be placed here |

## Notes

### 1. PullRequest (PR)

  - [ ] This PR implements new feature, fix bug, or some other changes
  - [ ] If PR is not ready to review mark it as Draft
  - [ ] All commits in this PR should be by [conventional-commits](https://www.conventionalcommits.org/en/v1.0.0/)

### 2. Why is my git pre-commit hook not executable by default?

- Because files are not executable by default; they must be set to be executable.

```
chmod ug+x .husky/*
chmod ug+x .git/hooks/*
```

### 3. [Production Best Practices: Security](https://expressjs.com/en/advanced/best-practice-security.html)

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
