const path                = require('path')
const webpack             = require('webpack')
const WebpackDevServer    = require('webpack-dev-server')


module.exports = function (webpackCfg) {
  new WebpackDevServer(webpack(webpackCfg), {
    contentBase: path.resolve(__dirname, '../'),
    publicPath: webpackCfg.output.publicPath,
    hot: true,
    historyApiFallback: true
  })
    .listen(3000, 'localhost', function (err, result) {
      if (err) {
        return console.log(err);
      }

      console.log('Listening at http://localhost:3000/');
    })
}
