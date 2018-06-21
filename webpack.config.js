const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = (env, options) => {
    const devMode = options.mode === 'development'

    return {
      entry: {
          app: [
            path.resolve(__dirname, './src/frontend/app.js')
          ]
      },
      output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: 'http://localhost:2992/assets/',
        filename: devMode ? 'bundle.js' : '[name].[chunkhash].js',
        chunkFilename: devMode ? 'bundle.js' : '[name].[chunkhash].js'
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
