import Menu from '../../components/Menu'

const Documents = ({ contentModel }) => (
  <div className="main">
    <Menu links={contentModel.sitemap} footer={contentModel.contactBlock}/>
    <div className="mainContent">
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
    </div>
  </div>
)

Documents.getInitialProps = async () => {
  const contentModel = await (await fetch('https://www.crossmountainranch.org/data/content.json')).json()
  return { contentModel }
}

export default Documents