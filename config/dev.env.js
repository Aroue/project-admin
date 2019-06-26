'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  // BASE_API: '"http://127.0.0.1:8080"',
  BASE_API: '"http://47.100.175.241:12369"',
})
