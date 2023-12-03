# Contributing

## Request for changes/ Pull Requests
You first need to create a fork of the [nodejs-auth-jwt](https://github.com/neverovski/nodejs-auth-jwt/) repository to commit your changes to it. Methods to fork a repository can be found in the [GitHub Documentation](https://docs.github.com/en/get-started/quickstart/fork-a-repo).

Then add your fork as a local project:

```sh
# Using HTTPS
git clone https://github.com/neverovski/nodejs-auth-jwt.git

# Using SSH
git clone git@github.com:neverovski/nodejs-auth-jwt.git
```

> [Which remote URL should be used ?](https://docs.github.com/en/get-started/getting-started-with-git/about-remote-repositories)

Then, go to your local folder

```sh
cd nodejs-auth-jwt
```

Add git remote controls :

```sh
# Using HTTPS
git remote add fork https://github.com/YOUR-USERNAME/nodejs-auth-jwts.git
git remote add upstream https://github.com/neverovski/nodejs-auth-jwts.git


# Using SSH
git remote add fork git@github.com:YOUR-USERNAME/nodejs-auth-jwts.git
git remote add upstream git@github.com/neverovski/nodejs-auth-jwts.git
```

You can now verify that you have your two git remotes:

```sh
git remote -v
```

## Receive remote updates
In view of staying up to date with the central repository :

```sh
git pull upstream main
```

## Choose a base branch
Before starting development, you need to know which branch to base your modifications/additions on. When in doubt, use main.

| Type of change                |           | Branches              |
| :------------------           |:---------:| ---------------------:|
| Documentation                 |           | `main`              |
| Bug fixes                     |           | `main`              |
| New features                  |           | `main`              |
| New issues models             |           | `YOUR-USERNAME:patch` |

```sh
# Switch to the desired branch
git switch main

# Pull down any upstream changes
git pull

# Create a new branch to work on
git switch --create patch/1234-name-issue
```

Commit your changes, then push the branch to your fork with `git push -u fork` and open a pull request on [the nodejs-auth-jwt repository](https://github.com/neverovski/nodejs-auth-jwt/) following the template provided.
