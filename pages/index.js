// import contentModel from '../static/data/content.js'
import fetch from 'isomorphic-fetch'
import moment from 'moment'
import * as _find from 'lodash.find'

import Menu from '../components/Menu'
import News from '../components/News'
import "../styles/styles.sass"

const Home = ({ contentModel }) => (
  <div className="main">
    <Menu />

    <div className="main-content">
      {contentModel.regions.alerts.map((a, i) => {
        return (
          <div key={i} className="notice">
            <div className="notice-title">{a.title}</div>
            <div className="notice-meta">{moment(a.date).utc().format('dddd, MMMM DD, YYYY HH:mma')} - {a.location}</div>
            <div className="notice-description">{a.description}</div>
          </div>
        )
      })}

      <p className="description">
        {_find(contentModel.regions.sections, s => s.content).content}
      </p>

      {
        contentModel && contentModel.regions && contentModel.regions.news && contentModel.regions.news.length ? (
          <News articles={contentModel.regions.news} />
        ) : null
      }

      <p className="disclosure">
        {_find(contentModel.regions.sections, s => s.disclosure).disclosure}
      </p>
    </div>
  </div>
)

Home.getInitialProps = async () => {
  const contentModel = await (await fetch('https://h0609pjup0.execute-api.us-west-2.amazonaws.com/dev/page/homepage')).json()
  return { contentModel }
}

export default Home
