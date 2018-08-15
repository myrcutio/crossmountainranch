import { Component } from 'react'
import * as _find from 'lodash.find'
import News from '../News'
import Section from '../Section'

const identifyingComponentFields = {
  newsHeadline: News,
  content: Section
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
        Regions:
        {this.switchComponent(regions)}
      </div>
    )
  }
}

export default Layout