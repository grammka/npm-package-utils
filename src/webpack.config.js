import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'


const webpackConfig = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    path.join(__dirname, './src/index')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: [ '', '.js', '.jsx', '.css' ]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'react-hot', 'babel' ],
        include: [ path.join(__dirname, './src') ]
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules&localIdentName=[local]___[hash:base64:5]'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new HtmlWebpackPlugin({
    //   title: 'NPM Package',
    //   template: path.join(__dirname, 'assets/index.ejs'),
    //   //favicon: path.join(config.paths.client, 'assets/favicon-32x32.png'),
    //   inject: 'body',
    //   hash: false,
    //   filename: 'index.html',
    //   minify: {
    //     removeComments: true
    //   }
    // })
  ]
}


export default webpackConfig
