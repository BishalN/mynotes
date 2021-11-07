module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [2, "always", ["global", "backend", "web", "mobile"]],
  },
};
