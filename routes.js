const fetch = require('isomorphic-fetch')
const { prodApiEndpoint } = require('./data/aws-exports')

module.exports = async () => {
  const siteMap = await (await fetch(`${prodApiEndpoint}/routes`)).json()

  const siteURLs = {
    '/': { page: '/', label: 'Home'},
    '/contact': { page: '/contact', label: 'Contact'},
    '/admin': { page: '/admin', label: 'Manage Content', menu: false}
  }

  siteMap.map(site => siteURLs[`${site.slug}`] = { page: '/', label: site.label})
  return siteURLs
}