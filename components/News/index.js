import moment from 'moment'

export default({ data }) => {
  return (
    <div className="news-item" key={data.newsId}>
      <div className="news-title">{data.newsHeadline}</div>
      <div className="news-subtitle">{data.newsSubtitle}</div>
      <div className="news-date">{moment(data.published).utc().format('dddd MMMM DD, YYYY')}</div>
      <div className="news-description">{data.newsContent}</div>
    </div>
  )
}
