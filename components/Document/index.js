export default ({data}) => (
  <div className={ data.docTitle ? 'document-section' : null }>
    { data.docTitle ? <h2 className="document-section-label">{data.docTitle}</h2> : null }
    { data.docUrl ?
      <div className="document-item">
        <a href={data.docUrl}>{data.docLabel}</a>
      </div> : null }
  </div>
)
