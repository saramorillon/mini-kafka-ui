const path = require('path')

module.exports = {
  settings: {
    'import/resolver': {
      typescript: {
        project: path.join(__dirname, './tsconfig.json'),
      },
    },
  },
  extends: [
    '@mini-utils/eslint-config-typescript',
    '@mini-utils/eslint-config-typescript/react',
    '@mini-utils/eslint-config-typescript/jest',
    '@mini-utils/eslint-config-typescript/jest-react',
    '@mini-utils/eslint-config-typescript/path-alias',
  ],
  rules: {
    'import/no-named-as-default-member': 'off',
    'import/default': 'off',
  },
}
