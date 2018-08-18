import { Component } from 'react'
import * as _find from 'lodash.find'
import Menu from '../Menu'
import News from '../News'
import Section from '../Section'
import Notice from '../Notice'
import Document from '../Document'
import ModalWithHandlers from "../AdminForms/ModalWithHandlers"
import _orderBy from "lodash.orderby"

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
  },
  docUrl: {
    table: 'documents',
    component: Document
  }
}

class Layout extends Component {
  state = {
    adminMode: false,
  }
  constructor(props) {
    super(props)
    if (props.adminMode) {
      this.state.adminMode = props.adminMode
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
          <div className="news-feed">
            <h2>News & Events</h2>

            { _orderBy(newsArray, ['published'], ['asc']).map((news, i) => {
              return this.state.adminMode
                ? <ModalWithHandlers
                  key={i}
                  table={identifiedRegion.table}
                  data={region}
                  handleUpdate={this.props.handleUpdate}
                  handleCreate={this.props.handleCreate}
                  handleDelete={this.props.handleDelete}
                  handleGet={this.props.handleGet}
                >
                  <RegionComponent data={news} />
                </ModalWithHandlers>
                : (
                <RegionComponent key={i} data={news} />
              )
            })}
          </div>

        )
      } else if (identifiedRegion.table == 'news') {
        // wow
        return null
      }

      if (this.state.adminMode) {
        return (
          <ModalWithHandlers
            key={i}
            table={identifiedRegion.table}
            data={region}
            handleUpdate={this.props.handleUpdate}
            handleCreate={this.props.handleCreate}
            handleDelete={this.props.handleDelete}
            handleGet={this.props.handleGet}
          >
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