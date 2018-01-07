const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (entry, outputPath) => {
  return {
    context: __dirname,
    entry: [entry],
    devtool: 'inline-source-map',
    output: {
      path: outputPath,
      filename: 'bundle.[chunkhash].js',
      publicPath: '/'
    },
    stats: {
      colors: true,
      reasons: true,
      chunks: false
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.jsx?$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        },
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.s?css$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins() {
                  return [
                    require('autoprefixer')
                  ]
                }
              }
            },
            'sass-loader'
          ]
        },
        {
          test: /\.(png|svg|ttf|gif|eot|woff|woff2)$/,
          loader: 'file-loader'
        }
      ]
    },
    devServer: {
      contentBase: outputPath,
      overlay: {
        warnings: false,
        errors: true
      },
      historyApiFallback: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './assets/index.html'
      }),
    ]
  }
}
