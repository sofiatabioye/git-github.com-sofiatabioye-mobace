import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable wrapper object types rule:
      "@typescript-eslint/no-wrapper-object-types": "off",
      // Disable explicit any rule:
      "@typescript-eslint/no-explicit-any": "off",
      // Disable empty object type rule:
      "@typescript-eslint/no-empty-object-type": "off",
      // Disable missing dependencies warning for React Hooks:
      "react-hooks/exhaustive-deps": "off",
      // Disable unused vars error:
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
];
