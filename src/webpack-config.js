const path                = require('path')
const deepmerge           = require('deepmerge')
const webpack             = require('webpack')
const CopyWebpackPlugin   = require('copy-webpack-plugin')
const HtmlWebpackPlugin   = require('html-webpack-plugin')


const getWebpackConfig = (config, opts) => {

  /*

   DevTool ************************************************ */

  const devtool = opts.dev ? 'cheap-module-source-map' : null

  /*

   DevServer ************************************************ */

  const devServer = {
    publicPath: '/',
    stats: 'errors-only',
    noInfo: true,
    lazy: false,
  }

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
    include: [ /\/npu/, new RegExp(config.appPath) ],
    exclude: /node_modules/,
    use: {
      loader: require.resolve('babel-loader'),
      options: {
        presets: [
          require.resolve('babel-preset-es2015'),
          require.resolve('babel-preset-react'),
          require.resolve('babel-preset-stage-0'),
        ],
        plugins: [
          // require.resolve('react-hot-loader/babel'),
        ],
      },
    },
  }, config.babelLoaderConfig)

  const rules = [
    babelLoaderConfig,
    {
      test: /\.css$/,
      use: [
        {
          loader: require.resolve('style-loader'),
        },
        {
          loader: require.resolve('css-loader'),
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
      new webpack.NoEmitOnErrorsPlugin(),
      new HtmlWebpackPlugin({
        title: config.title,
        template: path.join(__dirname, 'index.html'),
        hash: false,
        filename: 'index.html',
        inject: 'body',
      }),
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
    devServer,
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
