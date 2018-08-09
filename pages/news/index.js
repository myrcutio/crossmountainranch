import Menu from '../../components/Menu'
import contentModel from '../../data/content'

export default () => (
  <div className="main">
    <Menu links={contentModel.sitemap} footer={contentModel.contactBlock}/>
    <div className="mainContent">
      <div>
        <style>{`
      .newsTitle {
        font-style: italic;
        font-size: 125%;
        color: red;
        margin-right: 5px;
      }
      .newsDate {
        font-weight: 600;
      }
    `}</style>
        <h3>News and Events</h3>
        {contentModel.news.map((news, i) => (
          <div key={i}>
            <div>
              <span className="newsTitle">{news.title}</span>
            </div>
            <div><span className="newsDate">{news.date}</span>
            </div>
            <p>{news.content}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
)