import moment from 'moment'
import _orderBy from 'lodash.orderby'

export default({ data }) => {
  const newsArray = data.length ? data : [data]
  return (
    <div className="news-feed">
      <h2>News & Events</h2>

      { _orderBy(newsArray, ['published'], ['asc']).map((news, i) => (
        <div className="news-item" key={i}>
          <div className="news-title">{news.newsHeadline}</div>
          <div className="news-date">{moment(news.published).utc().format('dddd MMMM DD, YYYY')}</div>
          <div className="news-description">{news.newsContent}</div>
        </div>
      ))}
    </div>
  )
}
