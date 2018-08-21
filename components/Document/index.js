export default ({data}) => (
  <div>
    { data.docTitle ? <h2>{data.docTitle}</h2> : null }
    { data.docUrl ? <ul>
      <li>
        <a href={data.docUrl}>{data.docLabel}</a>
      </li>
    </ul> : null }
  </div>
)
