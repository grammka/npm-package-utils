#!/usr/bin/env node

const argv = require('yargs').argv
const npu = require('./npu')


const opts = {
  dev: argv.d || argv.dev
}


npu(opts)
