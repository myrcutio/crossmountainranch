import fetch from 'isomorphic-fetch'
import _cloneDeep from 'lodash.clonedeep'
import { prodApiEndpoint } from './data/aws-exports'
import { staticRoutes } from './staticRoutes'

export default async () => {
  const siteMap = await (await fetch(`${prodApiEndpoint}/routes`)).json()

  const siteURLs = _cloneDeep(staticRoutes)

  siteMap.map(site => siteURLs[`${site.slug}`] = { page: '/', label: site.label, pageOrder: site.pageOrder})
  return siteURLs
}