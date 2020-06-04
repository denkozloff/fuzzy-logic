const path = require('path');

module.exports = {
    entry: './main.js',
    devServer: {
        contentBase: './dist'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    module: {
        rules: []
    },
    plugins: []
};