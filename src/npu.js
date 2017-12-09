const fs          = require('fs')
const path        = require('path')
const deepmerge   = require('deepmerge')


let config = {
  title: 'NPU | Example',
  webpackConfig: {},
  babelLoaderConfig: {},
}

try {
  const configPath = path.resolve(process.cwd(), 'npu.config.js')

  config = deepmerge(config, require(configPath))
  config.appPath = path.resolve(process.cwd(), config.app)
} 
catch (err) {
  console.error('Cannot find module npu.config.js. Be sure to add this file to root of your project')
  process.exit(0)
}


const writeAppPath = path.join(__dirname, './src/App.js')

fs.writeFile(writeAppPath, `export default from '${config.appPath}'`, (err) => {
  if (err) {
    return console.log(err)
  }

  console.log(`File App.js created`)
})


const NPU = (opts) => {
  const webpackCfg = require('./webpack-config')(config, opts)
  const script = opts.dev ? require('./bin/server') : require('./bin/compile')

  script(webpackCfg, opts)
}


module.exports = NPU
