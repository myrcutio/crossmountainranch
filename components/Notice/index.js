import moment from 'moment'

export default({ data }) => {
  return (
    <div className="notice">
      <div className="notice-title">{data.noticeTitle}</div>
      <div className="notice-meta">{moment(data.noticeDate).utc().format('dddd, MMMM DD, YYYY')} {data.noticeTime} - {data.noticeLocation}</div>
      <div className="notice-description">{data.noticeContent}</div>
    </div>
  )
}
