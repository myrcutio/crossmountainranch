import React from 'react'
import Menu from '../../components/Menu'
import Mailto from 'react-protected-mailto'

import contentModel from '../../static/data/content.js'

const Contact = ({ contentModel }) => (
  <div className="main">
    <Menu />
    <div className="main-content">
      <div className="contact-section">
        <h2>Contact Association Manager</h2>
        <div className="contact-info">
          <div className="contact-name">{contentModel.contactBlock.name}</div>
          <div className="contact-title">{contentModel.contactBlock.title}</div>
        </div>

        <div className="contact-address">
          <div>{contentModel.contactBlock.addressPO}</div>
          <div>{contentModel.contactBlock.addressOne}</div>
          <div>{contentModel.contactBlock.addressTwo}</div>
        </div>

        <div><span className="contact-label">Office Phone:</span> {contentModel.contactBlock.officePhone}</div>
        <div><span className="contact-label">Fax:</span> {contentModel.contactBlock.fax}</div>
        <div><span className="contact-label">Email:</span> <Mailto email={contentModel.contactEmail} /></div>
      </div>

      <div className="contact-section">
        <h2>Contact Board of Directors</h2>
        <div className="contactEmail">
          <span className="contact-label">Email:</span> <Mailto email={contentModel.boardEmail} />
        </div>
      </div>
    </div>
  </div>
)

Contact.getInitialProps = async () => {
  // const contentModel = await (await fetch('https://www.crossmountainranch.org/data/content.json')).json()
  return { contentModel }
}

export default Contact
