import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["build/**", "coverage/**", "dist/**"]),
]);
