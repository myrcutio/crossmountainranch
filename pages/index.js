// import contentModel from '../static/data/content.js'
import fetch from 'isomorphic-fetch'
import moment from 'moment'
import * as _find from 'lodash.find'
import * as _get from 'lodash.get'

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
        {_get(_find(contentModel.regions.sections, s => s.content), 'content', null)}
      </p>

      {
        contentModel && contentModel.regions && contentModel.regions.news && contentModel.regions.news.length ? (
          <News articles={contentModel.regions.news} />
        ) : null
      }

      <p className="disclosure">
        {_get(_find(contentModel.regions.sections, s => s && s.disclosure), 'disclosure', null)}
      </p>
    </div>
  </div>
)

Home.getInitialProps = async () => {
  const contentModel = await (await fetch('https://is0oiqxqh3.execute-api.us-west-2.amazonaws.com/prod/path/homepage')).json()
  return { contentModel }
}

export default Home
