module.exports = {
    presets: [
        [
            "@babel/env",
            {
                useBuiltIns: "usage", // 启用polyfill
                corejs: 3,
            }
        ],
        [
            "@babel/preset-react",
        ]
    ],
};