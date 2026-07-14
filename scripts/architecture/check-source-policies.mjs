import { checkSourcePolicies } from "./source-policies.mjs";

const errors = checkSourcePolicies();

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(
  "Domain runtime inputs are explicit and web product source contains no Workspace product language.",
);
