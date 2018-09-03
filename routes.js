const fetch = require('isomorphic-fetch')
const _cloneDeep = require('lodash.clonedeep')
const { prodApiEndpoint } = require('./data/aws-exports')
const { staticRoutes } = require('./staticRoutes')

module.exports = async () => {
  const siteMap = await (await fetch(`${prodApiEndpoint}/routes`)).json()

  const siteURLs = _cloneDeep(staticRoutes)

  siteMap.map(site => siteURLs[`${site.slug}`] = { page: '/', label: site.label})
  return siteURLs
}