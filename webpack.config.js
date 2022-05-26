const path = require('path')
const webpack = require('webpack')

require('dotenv').config({ path: './.env' });

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        filename: 'build.js',
        path: path.join(__dirname, './dist/build.js')
    },
    devServer: {
        static: './dist',
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(process.env)
        }),
    ],
    watch: true,
}
