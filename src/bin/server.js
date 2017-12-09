const webpack                 = require('webpack')
const express                 = require('express')
const bodyParser              = require('body-parser')
const historyApiFallback      = require('connect-history-api-fallback')
const webpackMiddleware       = require('webpack-dev-middleware')
const webpackHotMiddleware    = require('webpack-hot-middleware')
const chalk                   = require('chalk')
const _debug                  = require('debug')


module.exports = (webpackCfg, opts) => {
  const app       = express()
  const compiler  = webpack(webpackCfg)
  const debug     = _debug('app:bin:server')

  app.disable('x-powered-by')
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json({ strict: true, limit: '10mb' }))
  app.use(historyApiFallback())
  app.use(webpackMiddleware(compiler, webpackCfg.devServer))
  // app.use(webpackHotMiddleware(compiler))

  app.listen(opts.port, '0.0.0.0', (err) => {
    if (err) {
      debug(chalk.red(err))
      process.exit(1)
    }
    console.info(`Listening on port ${opts.port}. Open up http://0.0.0.0:${opts.port}/ in your browser.`)
  })

}
