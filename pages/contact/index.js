import React from 'react'
import Mailto from 'react-protected-mailto'
import contentModel from '../../data/content'

export default () => (
  <div>
    <style>{`
      .contactInfo {
        margin-top: 10px;
        white-space: pre-line;
        padding-left: 50px;
      }
    `}</style>
    <h3>Contact Information</h3>
    <div className="contactInfo">{contentModel.contactBlock}</div>
    <div><Mailto email='srsneed@aol.com' /></div>
    <h3>Contact Board of Directors:</h3>
   <div><Mailto email='crossmtnranchsatx@gmail.com' /></div>
  </div>
)