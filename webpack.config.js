const { resolve } = require('path');

const PUBLIC_PATH = resolve(__dirname, 'public');
const SRC_PATH = resolve(__dirname, 'src');

module.exports = {
    entry: `${SRC_PATH}/index.js`,
    output: {
        filename: 'bundle.js',
        path: PUBLIC_PATH
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            }
        ]
    },
    devServer: {
        contentBase: PUBLIC_PATH,
        disableHostCheck: true,
        historyApiFallback: true
    }
};