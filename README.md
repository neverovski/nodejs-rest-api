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
$ npm run start:prod
```

## Next steps
  - Auth
    - [ ] Authenticate user
    - [ ] Refresh token
    - [ ] Logout a user
  - User
    - [ ] Сreate a new user
    - [ ] Update user
  - Platform
    - [ ] Facebook
    - [ ] Google
    - [ ] Twitter
    - [ ] Github

## Project Structure

| Name                              | Description |
| --------------------------------- | ----------- |
| **src/**                          | Source files |
| **src/middleware/**               | Express Middlewares like error handler feature |
| **build/**                        | Compiled source files will be placed here |
| **tests/**                        | Test cases will be placed here |
| **tests/unit/**             | Unit Test cases will be placed here  |
| **tests/integration/**      | API routes (Integration) Test cases will be placed here|

## Notes

### 1. Why is my git pre-commit hook not executable by default?

- Because files are not executable by default; they must be set to be executable.

```
chmod ug+x .husky/*
chmod ug+x .git/hooks/*
```

### 2. [Production Best Practices: Security](https://expressjs.com/en/advanced/best-practice-security.html)

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
