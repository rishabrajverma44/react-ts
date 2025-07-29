import hub from '@mindfiredigital/eslint-plugin-hub';
import globals from 'globals';

export default [
  // Extends the react config preset from the plugin
  hub.configs['flat/react'],
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    // Add any additional rules or overrides here
  },
];