/** @type {import("dependency-cruiser").IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "no-unresolvable-dependencies",
      severity: "error",
      comment:
        "Every import must resolve through TypeScript or package exports.",
      from: {},
      to: { couldNotResolve: true },
    },
    {
      name: "no-circular-dependencies",
      severity: "error",
      comment: "Runtime circular dependencies are not permitted.",
      from: { pathNot: "^node_modules" },
      to: { circular: true },
    },
    {
      name: "domain-has-no-external-dependencies",
      severity: "error",
      comment: "Domain code must be framework and SDK independent.",
      from: { path: "^modules/[^/]+/src/domain/" },
      to: {
        dependencyTypes: [
          "npm",
          "npm-dev",
          "npm-optional",
          "npm-peer",
          "npm-no-pkg",
          "npm-unknown",
          "core",
        ],
      },
    },
    {
      name: "domain-does-not-depend-outward",
      severity: "error",
      comment:
        "Domain cannot depend on application, contracts, or infrastructure.",
      from: { path: "^modules/([^/]+)/src/domain/" },
      to: { path: "^modules/$1/src/(application|contracts|infrastructure)/" },
    },
    {
      name: "application-does-not-depend-on-infrastructure",
      severity: "error",
      comment: "Application depends on ports, never concrete adapters.",
      from: { path: "^modules/([^/]+)/src/application/" },
      to: { path: "^modules/$1/src/infrastructure/" },
    },
    {
      name: "contracts-are-standalone",
      severity: "error",
      comment:
        "Published language cannot expose internal implementation types.",
      from: { path: "^modules/([^/]+)/src/contracts/" },
      to: { path: "^modules/$1/src/(domain|application|infrastructure)/" },
    },
    {
      name: "no-cross-context-internal-imports",
      severity: "error",
      comment: "Contexts cannot import another context's internals.",
      from: { path: "^modules/([^/]+)/src/" },
      to: {
        path: "^modules/[^/]+/src/(domain|application|infrastructure|composition)\\.?(ts)?",
        pathNot: "^modules/$1/src/",
      },
    },
    {
      name: "apps-use-local-composition-root",
      severity: "error",
      comment: "App routes and UI may not import module internals directly.",
      from: {
        path: "^apps/[^/]+/(app|components|src)/",
        pathNot: "^apps/[^/]+/src/server/composition/",
      },
      to: { path: "^modules/[^/]+/src/" },
    },
    {
      name: "technical-packages-do-not-depend-on-contexts",
      severity: "error",
      comment:
        "Reusable technical packages cannot depend on business contexts.",
      from: { path: "^packages/" },
      to: { path: "^modules/" },
    },
  ],
  options: {
    doNotFollow: { path: "node_modules" },
    tsPreCompilationDeps: true,
    enhancedResolveOptions: {
      exportsFields: ["exports"],
      conditionNames: ["import", "require", "node", "default"],
    },
  },
};
