import { checkCrossContextImports } from "./cross-context-imports.mjs";

const errors = checkCrossContextImports();

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Cross-context imports use published contract entrypoints.");
