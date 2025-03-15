module.exports = {
    root: true,
    extends: [
      "next/core-web-vitals", 
      "eslint:recommended", 
      "plugin:@typescript-eslint/recommended", 
      "plugin:react/recommended"
    ],
    rules: {
      // Disable wrapper object types rule:
      "@typescript-eslint/no-wrapper-object-types": "off",
      
      // Disable explicit any rule:
      "@typescript-eslint/no-explicit-any": "warn",
      
      // Disable empty object type rule:
      "@typescript-eslint/no-empty-object-type": "off",
      
      // Disable exhaustive deps warning for React Hooks:
      "react-hooks/exhaustive-deps": "off",
      
      // Disable unused vars error (or you can set it to warn):
      "@typescript-eslint/no-unused-vars": "off",
    },
  };
  