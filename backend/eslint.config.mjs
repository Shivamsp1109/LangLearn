// ESLint "flat config": one array of config objects, applied in order.
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default tseslint.config(
  { ignores: ["**/dist/**", "**/coverage/**", "**/node_modules/**"] },
  js.configs.recommended,
  // Type-aware rules: they use the TypeScript compiler to find bugs such as
  // un-awaited promises, not just style issues.
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  // Plain JS config files (like this one) aren't part of any tsconfig.
  { files: ["**/*.{js,mjs,cjs}"], ...tseslint.configs.disableTypeChecked },
  // Turns off ESLint rules that would fight with Prettier's formatting.
  prettier,
);
