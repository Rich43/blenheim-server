module.exports = {
    'parser': '@typescript-eslint/parser',
    'env': {
        'browser': true,
        'es6': true,
    },
    'extends': [
        'plugin:@typescript-eslint/recommended',
        'standard',
        'standard-react'
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly',
    },
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true,
        },
        'ecmaVersion': 2018,
        'sourceType': 'module',
    },
    'plugins': [
        'react',
        'graphql',
        '@typescript-eslint'
    ],
    'settings': {
        'react': {
            'version': '16.0'
        }
    },
    rules: {
        "graphql/template-strings": ['error', {
            // Import default settings for your GraphQL client. Supported values:
            // 'apollo', 'relay', 'lokka', 'fraql', 'literal'
            env: 'apollo',

            // Import your schema JSON here
            schemaJson: require('./src/schema.json'),

            // OR provide absolute path to your schema JSON (but not if using `eslint --cache`!)
            // schemaJsonFilepath: path.resolve(__dirname, './schema.json'),

            // OR provide the schema in the Schema Language format
            // schemaString: printSchema(schema),

            // tagName is gql by default
        }],
        "@typescript-eslint/explicit-function-return-type": "off",
        "react/jsx-no-bind": ["error", {
            "allowArrowFunctions": true,
            "allowBind": false,
            "ignoreRefs": true
        }],
        "react/no-did-update-set-state": "error",
        "react/no-unknown-property": "error",
        "react/no-unused-prop-types": "error",
        "react/react-in-jsx-scope": "error",
        "indent": ["error", 4],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "react/prop-types": ["error", {"ignore": ["children"]}],
        "semi": ["error", "always"],
        "space-before-function-paren": ["error", "never"]
    },
};
