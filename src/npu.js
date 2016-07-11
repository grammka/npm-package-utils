var fs    = require('fs')
var path  = require('path')


var configPath = path.resolve(process.cwd(), 'npu.config.js')

var config
try {
  config = require(configPath)
} catch (err) {
  console.error('Cannot find module npu.config.js. Be sure to add this file to root of your project')
  process.exit(0)
}
config.appPath = path.resolve(process.cwd(), config.app)


var writeAppPath = path.join(__dirname, './src/App.js')
fs.writeFile(writeAppPath, `export default from '${ config.appPath }'`, (err) => {
  if (err) return console.log(err)

  console.log(`File App.js created`);
})


const webpackCfg = require('./webpack-config')(config, opts)


function NPU(opts) {
  if (opts.dev) {
    require('./bin/server')(webpackCfg)
  } else {
    require('./bin/compile')(webpackCfg)
  }
}


module.exports = NPU
