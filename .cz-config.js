// prettier-ignore
const types = [
  { value: "feat",     name: "feat", description: "A new feature" },
  { value: "fix",      name: "fix", description: "A bug fix" },
  { value: "docs",     name: "docs", description: "Documentation only changes" },
  { value: "style",    name: "style", description: "Changes that do not affect the meaning of the code", },
  { value: "chore",    name: "chore", description: "Changes to the build process or auxiliary tools", },
  { value: "config",   name: "config", description: "Changes in configuration files. Add new or remove old." },
  { value: "refactor", name: "refactor", description: "A code change that neither fixes a bug nor adds a feature", },
  { value: "perf",     name: "perf", description: "A code change that improves performance" },
  { value: "test",     name: "test", description: "Adding missing tests" },
  { value: "revert",   name: "revert", description: "Revert to a commit" },
  { value: "wip",      name: "wip", description: "Work in progress" },
]

module.exports = {
  types: types.map(beautify),
  scopes: [],
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix', 'revert'],
  askForBreakingChangeFirst: true,
};

function beautify({ value, name, description }) {
  return {
    value,
    name: `${name.padEnd(12, ' ')} ${description}`,
  };
}
