import React from 'react'
import Menu from '../../components/Menu'
import Mailto from 'react-protected-mailto'

const Contact = ({ contentModel }) => (
  <div className="main">
    <Menu links={contentModel.sitemap} footer={contentModel.contactBlock}/>
    <div className="mainContent">
      <div>
        <style>{`
      .contactInfo {
        margin-top: 10px;
        white-space: pre-line;
        padding-left: 50px;
      }
      .contactEmail {
        padding-left: 50px;
      }
    `}</style>
        <h3>Contact Information</h3>
        <div className="contactInfo">{contentModel.contactBlock}</div>
        <div className="contactEmail">Email: <Mailto email={contentModel.contactEmail} /></div>
        <h3>Contact Board of Directors:</h3>
        <div className="contactEmail">Email: <Mailto email={contentModel.boardEmail} /></div>
      </div>
    </div>
  </div>
)

Contact.getInitialProps = async () => {
  const contentModel = await (await fetch('https://www.crossmountainranch.org/data/content.json')).json()
  return { contentModel }
}

export default Contact