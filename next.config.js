// next.config.js
const withSass = require('@zeit/next-sass')
const routes = require('./routes')
process.env.REACT_SPINKIT_NO_STYLES = true

module.exports = withSass({
  exportPathMap: async function (defaultPathMap) {
    return await routes()
  }
})
