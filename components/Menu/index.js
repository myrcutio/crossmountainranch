import React from 'react'
import Mailto from 'react-protected-mailto'
import contentModel from '../../data/content'

export default ({links, footer}) => (
  <div className="menu">
    <style>{`
      .menu {
        padding-top: 15px;
        padding-right: 10px;
      }

      .menu a {
        text-align: right;
        padding-top: 10px;
        display: block;
      }
      .menu .footer {
        margin-top: 20px;
        white-space: pre;
        text-align: right;
      }
      .menuEmail {
        text-align: right;
      }
      .menu .menuEmail a {
        padding-top: 0;
        display: inline-block;
      }
    `}</style>
    {links.map((l, i) => (
      <div key={i}>
        <a href={l.url}>{l.label}</a>
      </div>
    ))}
    <div className="footer">{footer}</div>
    <div className="menuEmail">
      Email: <Mailto email={contentModel.contactEmail} />
    </div>
  </div>
)