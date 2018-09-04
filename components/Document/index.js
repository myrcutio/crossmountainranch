export default ({data}) => (
  <div>
    { data.docUrl ?
      <div className="document-item">
        <a href={data.docUrl}>{data.docLabel}</a>
      </div> : null }
  </div>
)
