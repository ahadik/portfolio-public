module.exports = {
  "extends": "airbnb",

  "plugins": [
    "react",
    "jsx-a11y",
    "import",
    "no-null",
    "jsx-control-statements",
    "chai-friendly"
  ],

  "env": {
    "browser": true,
    "node": false,
    "commonjs": true,
    "es6": true,
    "mocha": true
  },

  "parserOptions": {
    "ecmaVersion": 2017,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },

  // Do NOT add new globals. There is no reason to avoid importing your
  // dependency.
  "globals": {
    "rtag": true,
    "heap": true,
    "Stripe": true,
    "Bugsnag": true,
    "process": true,
    "If": true,
    "When": true,
    "Choose": true,
    "Otherwise": true,
    "Transcriptic": true,
    "Feature": true
  },

  "settings": {
    "import/resolver": {
      "alias": [
        ["~components", "./src/components"]
      ],
      "node": {
        "paths": ["src"],
        "moduleDirectory": ["src", "node_modules"]
      }
    }
  },

  "rules": {

    "key-spacing": ["warn", {"mode": "minimum"}],

    "indent": [ "off" ],

    "comma-dangle": ["warn", "never"],

    "space-before-function-paren": ["error", "never"],

    "new-cap": "off",

    "max-len": ["error", 120],

    "import/no-unresolved": ["error", {"commonjs": false, "amd": false}],

    // shapes are not well supported by this rule yet
    "react/no-unused-prop-types": ["error", {"skipShapeProps": true}],

    // Temporarily disabling these as we convert coffee to JSX
    "react/prefer-es6-class": "off",
    "react/no-multi-comp": "off",

    // This rule by default forbids ["any", "array", "object"] prop types
    "react/forbid-prop-types": ["error", { "forbid": ["array"] }],

    // 'as_needed' wants some multiline function bodies to not use braces which is wrong
    // 'always' adds unnecessary noise in short anonymouse functions
    "arrow-body-style": "off",

    // turning off because it prevents alignment of 'this' variable assignment
    "no-multi-spaces": "off",

    "no-console": "off",

    // Disable `object-shorthand` allow for use of the `function` keyword in object
    // literals so that Babel doesn't transpile the `this` keyword to `undefined`
    // Disable 'func-names' so that `function` can be used in object literals w/o supplying a name.
    // http://stackoverflow.com/questions/34416081/babel-replaces-this-with-undefined
    // TODO[Tate]: We should revisit this. We're using `this` improperly if we need this.
    "object-shorthand": "off",
    "func-names": "off",

    // Allow dangle sometimes

    "no-underscore-dangle": ["error", {
      "allow": [
        "_receiveData", // CRUDStore
        "_register", // CRUDStore
        "_remove", // CRUDStore
        "_callbacks" // Network
      ],
      "allowAfterThis": true
    }],

    "no-alert": "off",

    "no-else-return": "off",

    // This solves two issues.  One is that we have import paths like `main/dispatcher` and
    // eslint freaks out about relative paths.  The other is that eslint warns about coffee files
    // not being imported with their extension included in the import statement.
    "import/extensions": "off",

    "no-null/no-null": ["error"],


    // Must set aria-pressed={buttonState}, role="button", and tabIndex="0" for divs
    // in order to meet accessibility standards
    "jsx-a11y/no-static-element-interactions": "off",

    "jsx-a11y/heading-has-content": "off",

    "jsx-a11y/anchor-has-content": "off",

    // [Tate] I disagree. I think this should be on. Especially w.r.t reference types.
    // Preventing the modification of a function parameter is a bit harsh. This
    // prevents reassignment but allows modification
    "no-param-reassign": ["error", { "props": false }],

    // don't complain about extra blank lines.
    "padded-blocks": "off",

    // Allow return statements in if/else blocks.
    "no-else-return": "off",

    "react/require-default-props": "off",

    // doesn't play well with no-null.
    // `foo == undefined` is identical to `foo == undefined || foo == null`
    "eqeqeq": "off",

    // this would be nice, but currently we have far too many snake_cased names from
    // snake casing our api responses.
    "camelcase": "off",

    // Ignore not checking object props.
    "guard-for-in": "off",

    "no-unused-vars": ["error", {
      "varsIgnorePattern": "^_",
      "argsIgnorePattern": "^_"
    }],

    // allow ++ and --
    "no-plusplus": "off",

    // allow test files to use devDependencies
    "import/no-extraneous-dependencies": ["error", {"devDependencies": ["**/*.spec.js", "./gatsby-node.js"]}],

    "react/prefer-stateless-function": "off",
    "react/prefer-es6-class": "off",
    "react/forbid-prop-types": "off",

    "react/prefer-es6-class": "off",

    "react/forbid-prop-types": "off",

    // would be better to use exceptionMethods, but this wasn't working for me.
    "class-methods-use-this": "off",

    // Required for JSX control statements.
    "jsx-control-statements/jsx-use-if-tag": "off",
    "react/jsx-no-undef": [2, { "allowGlobals": true }],

    // Required for Chai friendly linting.
    "no-unused-expressions": 0,
    "chai-friendly/no-unused-expressions": 2
  }
}
