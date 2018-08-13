import React from 'react'
import Mailto from 'react-protected-mailto'
import contentModel from '../../static/data/content'

const sitemap =[{
  url: '/',
  label: 'Home'
}, {
  url: '/board',
  label: 'Board of Directors'
}, {
  url: '/documents',
  label: 'Documents'
}, {
  url: '/contact',
  label: 'Contact'
}]

export default () => (
  <div className="menu">
    {sitemap.map((l, i) => (
      <div key={i} className="menu-item">
        <a href={l.url}>{l.label}</a>
      </div>
    ))}

    {/*<div className="menu-footer">
      <div className="contact-info">
        <div className="contact-name">{contentModel.contactBlock.name}</div>
        <div className="contact-position">{contentModel.contactBlock.position}</div>
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
    </div>*/}
  </div>
)
