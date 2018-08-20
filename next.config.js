// next.config.js
const withSass = require('@zeit/next-sass')
const routes = require('./routes')

module.exports = withSass({
  exportPathMap: async function (defaultPathMap) {
    return await routes()
  }
})
