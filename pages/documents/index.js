import Menu from '../../components/Menu'

import contentModel from '../../static/data/content.js'

const Documents = ({ contentModel }) => (
  <div className="main">
    <Menu />

    <div className="main-content">
      {contentModel.documents.map((section, i) => (
        <div key={i}>
          <h2>{section.section}</h2>
          <ul>
            {section.docs.map((document, x) => (
              <li key={x}>
                <a href={document.url}>{document.label}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
)

Documents.getInitialProps = async () => {
  // const contentModel = await (await fetch('https://www.crossmountainranch.org/data/content.json')).json()
  return { contentModel }
}

export default Documents
