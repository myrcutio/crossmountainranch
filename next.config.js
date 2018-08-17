// next.config.js
const withSass = require('@zeit/next-sass')

module.exports = withSass({
  exportPathMap: async function (defaultPathMap) {
    return {
      '/': { page: '/'},
      '/contact': { page: '/contact'},
      '/board': { page: '/board'},
      '/documents': { page: '/documents'},
      '/admin': { page: '/admin'}
    }
  }
})
