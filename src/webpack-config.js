const path                = require('path')
const deepmerge           = require('deepmerge')
const webpack             = require('webpack')
const CopyWebpackPlugin   = require('copy-webpack-plugin')


const getWebpackConfig = (config, opts) => {

  /*

   DevTool ************************************************ */

  const devtool = opts.dev ? 'cheap-module-source-map' : null

  /*

   Entry ************************************************ */

  const entry = (opts.dev ? [
    // `webpack-dev-server/client?http://localhost:${opts.port}`,
    // 'react-hot-loader/patch',
  ] : [])
    .concat([
      path.join(__dirname, './src/index'),
    ])

  /*

   Output ************************************************ */

  const output = {
    path: opts.dev ? path.join(__dirname, 'dist') : path.resolve(process.cwd(), opts.output),
    filename: 'bundle.js',
    publicPath: '/',
  }

  /*

   Rules ************************************************ */

  const babelLoaderConfig = deepmerge({
    test: /\.jsx?$/,
    include: /\/npu/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [ 'es2015', 'react', 'stage-0' ],
        plugins: [ 'react-hot-loader/babel' ],
      },
    },
  }, config.babelLoaderConfig)

  const babelLoaderInclude = babelLoaderConfig.include

  if (babelLoaderInclude instanceof Array) {
    babelLoaderConfig.include.push(new RegExp(config.appPath))
  }
  else {
    babelLoaderConfig.include = [ babelLoaderConfig.include, new RegExp(config.appPath) ]
  }

  const rules = [
    babelLoaderConfig,
    {
      test: /\.css$/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[local]___[hash:base64:5]',
          },
        },
      ],
    },
  ]
    .concat(config.webpackConfig.rules || [])

  /*

   Resolve ************************************************ */

  const resolve = {
    modules: [
      path.resolve(__dirname, '../node_modules'),
    ],
    extensions: [ '.js', '.jsx', '.css', '.styl', '.scss' ],
  }

  /*

   Plugins ************************************************ */

  let plugins

  if (opts.dev) {
    plugins = [
      // new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ]
  }
  else {
    plugins = [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production'),
        },
      }),
      new webpack.optimize.UglifyJsPlugin({
        comments: false,
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false,
          screw_ie8: true,
        },
      }),
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, './index.html'),
          to: path.resolve(process.cwd(), opts.output, './index.html'),
        },
      ]),
    ]
  }

  /* *************************************************** */

  const webpackConfig = {
    devtool,
    entry,
    output,
    resolve,
    module: {
      rules,
    },
    plugins,
  }

  return webpackConfig
}


module.exports = getWebpackConfig
