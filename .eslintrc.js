module.exports = {
    "env": {
        "browser": true,
        "jquery": true
    },
    "globals": {
        _: false,
        cartodb: false,
        chroma: false,
        d3: false,
        Chart: false,
        TCVIZ: true
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
