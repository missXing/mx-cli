---
extend: ':./build/base.config.js'
// extend: 'mx-cli-plugin-webpack/generator/template/build/base.config.js'
keepSpace: true
replace:
  - !!js/regexp /\s*rules:\s?\[\s*\{/
---
<%# REPLACE %>
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
<%# END_REPLACE %>