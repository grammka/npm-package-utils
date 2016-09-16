#!/usr/bin/env node

const argv = require('yargs').argv
const npu = require('./npu')


const opts = {
  dev: argv.d || argv.dev,
  output: argv.o || argv.output,
  port: parseInt(argv.p || argv.port),
}

if (opts.port && !/^\d+$/.test(opts.port)) {
  console.log('Error: Wrong port format passed as argument\n')
  process.exit(0)
}

if (!opts.dev && !opts.output) {
  console.log('Error: Missed --output argument\n')
  process.exit(0)
}


npu(opts)
