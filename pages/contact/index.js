import React from 'react'
import Menu from '../../components/Menu'
import Mailto from 'react-protected-mailto'
import contentModel from '../../data/content'

export default () => (
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