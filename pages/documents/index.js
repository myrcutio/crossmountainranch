import contentModel from '../../data/content'

export default () => (
  <div className="docWrapper">
    <style>
      {`
        .docWrapper ul div {
          font-weight: 600;
        }
        .docWrapper ul li {
          margin-left: 25px;
        }
        `}
    </style>
    {contentModel.documents.map((document, i) => (
      <ul key={i}>
        <div>{document.title}</div>
        {document.url ? ( 
          <li>
           <a href={document.url}>{document.label}</a>
          </li>
        ) : null}
      </ul>
    ))}
  </div>
)