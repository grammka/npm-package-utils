var path      = require('path')
var merge     = require('lodash.merge')
var webpack   = require('webpack')


function getWebpackConfig(config, opts) {
  var babelLoaderConfig = merge({
    test: /\.js$/,
    loader: 'babel',
    include: /node_modules\/npu/,
    query: {
      presets: [ 'es2015', 'stage-0', 'react' ],
      plugins: [ 'add-module-exports' ]
    }
  }, config.babelLoaderConfig)

  var babelLoaderInclude = babelLoaderConfig.include

  if (babelLoaderInclude instanceof Array) {
    babelLoaderConfig.include.push(new RegExp(config.appPath))
  } else {
    babelLoaderConfig.include = [ babelLoaderConfig.include, new RegExp(config.appPath) ]
  }


  var loaders = [
    {
      test: /\.js$/,
      loader: 'react-hot',
      exclude: /node_modules/
    },
    babelLoaderConfig,
    {
      test: /\.css$/,
      loader: 'style!css?modules&localIdentName=[local]___[hash:base64:5]'
    }
  ].concat(config.webpackConfig && config.webpackConfig.loaders || [])

  
  var webpackConfig = {
    devtool: 'eval',

    entry: [ path.join(__dirname, './src/index') ].concat(opts.dev ? [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server'
    ] : []),

    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/static/'
    },

    resolve: {
      fallback: path.resolve(__dirname, '../node_modules'),
      extensions: [ '', '.js', '.jsx', '.css', '.styl' ]
    },
    resolveLoader: {
      root: path.resolve(__dirname, '../node_modules')
    },

    module: {
      loaders: loaders
    },

    plugins: [
      new webpack.optimize.OccurenceOrderPlugin()
    ].concat(process.env.NODE_ENV === 'production' ? [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      })
    ] : [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ])
  }

  return webpackConfig
}


module.exports = getWebpackConfig
