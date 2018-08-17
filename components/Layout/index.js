import { Component } from 'react'
import * as _find from 'lodash.find'
import Menu from '../Menu'
import News from '../News'
import Section from '../Section'
import Notice from '../Notice'
import ModalWithHandlers from "../AdminForms/ModalWithHandlers";

const identifyingComponentFields = {
  newsHeadline: {
    table: 'news',
    component: News
  },
  content: {
    table: 'sections',
    component: Section
  },
  disclosure: {
    table: 'sections',
    component: Section
  },
  noticeTitle: {
    table: 'notices',
    component: Notice
  }
}

class Layout extends Component {
  state = {
    adminMode: false,
    handlers: {}
  }
  constructor(props) {
    super(props)
    if (props.adminMode) {
      this.state.adminMode = props.adminMode
    }
    if (props.handlers) {
      this.state.handlers = props.handlers
    }
  }

  switchComponent = (regionArray) => {
    // Hack alert!
    // Aggregating news because my data model didn't account for it well enough
    let newsArray = regionArray.filter(r => r['newsHeadline'])
    let newsRendered = false

    return regionArray.map((region, i) => {
      const identifiedRegion = identifyingComponentFields[_find(Object.keys(region), key => region[key] && identifyingComponentFields[key])]

      if (!identifiedRegion) {
        console.warn('Could not identify region from data: ', region)
        return null
      }
      const RegionComponent = identifiedRegion.component

      // Such hack
      if (identifiedRegion.table == 'news' && !newsRendered) {
        newsRendered = true
        return (
          <RegionComponent key={i} data={newsArray} />
        )
      } else if (identifiedRegion.table == 'news') {
        // wow
        return null
      }

      if (this.state.adminMode) {
        return (
          <ModalWithHandlers key={i} table={identifiedRegion.table} data={region} handlers={this.state.handlers}>
            <RegionComponent data={region} />
          </ModalWithHandlers>
        )
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