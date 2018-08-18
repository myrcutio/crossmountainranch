export default ({data}) => (
  <div>
    <h2>{data.docTitle}</h2>
    <ul>
      <li>
        <a href={data.docUrl}>{data.docLabel}</a>
      </li>
    </ul>
  </div>
)
