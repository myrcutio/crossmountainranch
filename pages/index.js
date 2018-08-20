import fetch from 'isomorphic-fetch'
import "../styles/styles.sass"
import Layout from "../components/Layout"
import { prodApiEndpoint } from "../data/aws-exports"
import routes from '../routes.es6'

const App = ({ regions, siteMap }) => (
  <Layout regions={regions} siteMap={siteMap}/>
)

App.getInitialProps = async (context) => {
  const siteMap = await routes()
  const pageSlug = context.req.url
  const data = await (await fetch(`${prodApiEndpoint}/path${pageSlug}`)).json()
  const { regions } = data
  console.log('if context is empty, i wouldnt know it because shit still rendered: ', pageSlug, ':', regions.length)
  return { regions, siteMap }
}

export default App
