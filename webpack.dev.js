const path = require('path')

const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    performance: {
      hints: false
    },
    mode: "development",
    entry: './demo/index.js',
    output: {
        filename: 'js/scripts.js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dev-dist'),
    },
    module: {
        rules: [{
          test: /\.css$/i,
          exclude: /node_modules/,
          use: [{ loader: 'style-loader', options: { injectType: 'styleTag' } },
          'css-loader',],
        },{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: ['env', 'es2015', 'react', 'stage-1'],
            }
        }]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: './index.html', to: './' },
        ]),
    ],
    devServer: {
      contentBase: path.join(__dirname, 'dev-dist'),
      compress: true,
      port: 9000
    }
}