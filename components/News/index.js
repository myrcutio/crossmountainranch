import contentModel from '../../static/data/content'

export default() => (
  <div className="news-feed">
    <h2>News & Events</h2>

    {contentModel.news.map((news, i) => (
      <div className="news-item" key={i}>
        <div className="news-title">{news.title}</div>
        <div className="news-date">{news.date}</div>
        <div className="news-description">{news.content}</div>
      </div>
    ))}
  </div>
)