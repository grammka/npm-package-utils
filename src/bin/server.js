const path                = require('path')
const webpack             = require('webpack')
const WebpackDevServer    = require('webpack-dev-server')


module.exports = function (webpackCfg, opts) {
  const port = opts.port || 3000
  
  new WebpackDevServer(webpack(webpackCfg), {
    contentBase: path.resolve(__dirname, '../'),
    publicPath: webpackCfg.output.publicPath,
    hot: true,
    historyApiFallback: true
  })
    .listen(port, 'localhost', function (err, result) {
      if (err) {
        return console.log(err);
      }

      console.log(`Listening at http://localhost:${ port }/`);
    })
}
