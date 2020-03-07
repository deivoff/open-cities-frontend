const schemaJson = require('./schema.json');

module.exports = {
    env: {
        "browser": true,
        "es6": true,
        "node": true
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:security/recommended",
        "plugin:@typescript-eslint/eslint-recommended"
    ],
    globals: {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    overrides: [{
        files: ['*.tsx', '*.ts'],
        rules: {
            'react/prop-types': 0,
            'jsx-a11y/media-has-caption': 0,
            'no-unused-vars': 0
        }
    }],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    plugins: [
        "react",
        "graphql",
        "@typescript-eslint"
    ],
    rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/interface-name-prefix": 0,
        "graphql/template-strings": ['error', {
            env: 'apollo',
            tagName: 'FirstGQL',
            validators: 'all',
            schemaJson,
        }],
        "graphql/named-operations": ['warn', {
            schemaJson,
        }],
    },
    settings:  {
        "react":  {
            "version":  'detect',  // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
};
