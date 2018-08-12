import contentModel from '../static/data/content.js'

import Menu from '../components/Menu'
import News from '../components/News'
import "../styles/styles.sass"

const Home = ({ contentModel }) => (
  <div className="main">
    <Menu links={contentModel.sitemap} footer={contentModel.contactBlock}/>

    <div className="main-content">
      <div className="notice">
        <div className="notice-title">{contentModel.alert.title}</div>
        <div className="notice-meta">{contentModel.alert.date} - {contentModel.alert.location}</div>
        <div className="notice-description">{contentModel.alert.description}</div>
      </div>

      <p className="description">
        {contentModel.homepage.description}
      </p>

      <News />

      <p className="disclosure">
        {contentModel.homepage.disclosure}
      </p>
    </div>
  </div>
)

Home.getInitialProps = async () => {
  // const contentModel = await (await fetch('https://www.crossmountainranch.org/data/content.json')).json()
  return { contentModel }
}

export default Home
