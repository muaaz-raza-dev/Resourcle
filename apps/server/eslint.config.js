import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

// Export the configuration using ES module syntax
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
