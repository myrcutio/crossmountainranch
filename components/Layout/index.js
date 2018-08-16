import { Component } from 'react'
import * as _find from 'lodash.find'
import Menu from '../Menu'
import News from '../News'
import Section from '../Section'
import Notice from '../Notice'

const identifyingComponentFields = {
  newsHeadline: News,
  content: Section,
  disclosure: Section,
  noticeTitle: Notice
}

class Layout extends Component {
  constructor(props) {
    super(props)
  }

  switchComponent = (regionArray) => {
    return regionArray.map((region, i) => {
      const RegionComponent = identifyingComponentFields[_find(Object.keys(region), key => region[key] && identifyingComponentFields[key])]
      if (!RegionComponent) {
        console.warn('Could not identify region from data: ', region)
        return null
      }
      return (
        <RegionComponent key={i} data={region} />
      )
    })
  }

  render() {
    const regions = this.props.regions || []
    return (
      <div className="main">
        <Menu />

        <div className="main-content">
          {this.switchComponent(regions)}
        </div>
      </div>
    )
  }
}

export default Layout