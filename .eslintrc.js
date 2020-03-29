const schemaJson = require('./schema.json');

module.exports = {
    env: {
        "browser": true,
        "es6": true,
        "node": true
    },
    extends: [
        "eslint:recommended",
        "airbnb",
        "airbnb/hooks",
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
        "react-hooks",
        "@typescript-eslint",
    ],
    rules: {
        "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
        "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".ts", ".tsx"] }],
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/interface-name-prefix": 0,
        "graphql/template-strings": ['error', {
            env: 'literal',
            tagName: 'OpenCities',
            validators: 'all',
            schemaJson,
        }],
        "graphql/named-operations": ['warn', {
            schemaJson,
        }],
        "arrow-parens": ["error", "as-needed"],
        "import/extensions": [2, "never"],
        "import/prefer-default-export": "off",
        "indent": ["error", 2],
        "dot-notation": [0],
        "no-underscore-dangle": ["error", { "allow": ["_id"] }],
        "camelcase": [0],
        "jsx-a11y/anchor-is-valid": [ "error", {
            "components": [ "Link" ],
            "specialLink": [ "hrefLeft", "hrefRight" ],
            "aspects": [ "invalidHref", "preferButton" ]
        }],
    },
    settings:  {
        "react":  {
            "version":  'detect',  // Tells eslint-plugin-react to automatically detect the version of React to use
        },
        "import/resolver": {
            "node": {
                "extensions": [
                    ".js",
                    ".jsx",
                    ".ts",
                    ".tsx"
                ]
            },
            "typescript": {}
        }
    }
};
