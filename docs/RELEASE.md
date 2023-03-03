# How to draft and publish a new release

For **maintainers** only.

This document explains what are the necessary steps to draft a new release and publish it on NPM and GitHub.

## Draft a new release

At a given point in time, if you want to draft a new release, you need to follow a specific sequence of actions, as described in the following sections:

### 0. Pick a version number

- Versioning should follow [semantic versioning](https://semver.org/) which, in short, means:
  - Versions numbers use the format `X.Y.Z` where `X` is called "major", Y is called "minor" and `Z` is called "patch".
  - If the new releases fixes bugs in a backward compatible way, only the "patch" fragment should be bumped.
  - If you are adding a new feature in a backward compatible way, "minor" should be bumped and "patch" should be reset to `0`.
  - If you are providing any breaking change, you should bump "major" and reset to `0` both "minor" and "patch".
  - You can optionally have suffixes such as `-alpha` or `-beta` for pre-releases of upcoming major versions.
  - If you need to have multiple versions of pre-releases, those should have a `.X` suffix, where `X` is an increasing number (e.g. `1.0.0-beta.15`).

### 1. Changelog

- Releases should always be done from the `main` branch (unless working on a future/past major version branch like `0.x` or `2.0`).
- You can create a `release-vX.Y.Z` branch if you want to do all the necessary changes in multiple commits and/or if you wish to have a review from the other maintainers
- Automatic update [CHANGELOG](/CHANGELOG.md)

### 2. Publish release on GitHub

- If you have been working on a branch so far, make sure the branch is merged back to maiin (or its own version branch in case of future/past major versions).
- Run release command `npm run release`
- Publish release

## Setting up new major release

- `package.json`
  - Update `engines` versions
