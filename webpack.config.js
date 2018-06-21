const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const devMode = process.env.NODE_ENV !== 'production'

module.exports = (env, options) => {
    return {
      entry: {
          app: [
            path.resolve(__dirname, './src/index.js')
          ]
      },
      output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: 'http://localhost:2992/assets/',
        filename: '[name].[chunkhash].js',
        chunkFilename: '[id].[chunkhash].js'
      },
      resolve: {
        extensions: ['.js', '.css', '.pug']
      },
      devServer: {
       headers: { "Access-Control-Allow-Origin": "*" }
      },
      module: {
          rules: [
              {
                test: /\.js$/i,
                use: 'babel-loader',
                exclude: /node_modules/
              },
              {
                test: /\.pug$/i,
                use: 'pug-loader'
              }
          ]
      },
      plugins: [
        new UglifyJsPlugin()
      ]
  }
}
