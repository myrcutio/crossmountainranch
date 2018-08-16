import fetch from 'isomorphic-fetch'
import "../styles/styles.sass"
import Layout from "../components/Layout";

const Home = ({ contentModel }) => (
  <Layout regions={contentModel.regions} />
)

Home.getInitialProps = async () => {
  const contentModel = await (await fetch('https://is0oiqxqh3.execute-api.us-west-2.amazonaws.com/prod/path/homepage')).json()
  return { contentModel }
}

export default Home
