import { Component } from 'react'
import Menu from '../Menu'
import News from '../News'
import Section from '../Section'
import Notice from '../Notice'
import Document from '../Document'
import CommitteeMember from '../CommitteeMember'
import ModalWithHandlers from "../AdminForms/ModalWithHandlers"
import _orderBy from "lodash.orderby"
import _get from 'lodash.get'
import _find from 'lodash.find'
import _some from 'lodash.some'

const identifyingComponentFields = {
  fullName: {
    table: 'committeeMembers',
    component: CommitteeMember
  },
  newsHeadline: {
    table: 'news',
    component: News
  },
  title: {
    table: 'sections',
    component: Section
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
  noticeContent: {
    table: 'notices',
    component: Notice
  },
  noticeLocation: {
    table: 'notices',
    component: Notice
  },
  noticeDate: {
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
    pageId: null
  }
  constructor(props) {
    super(props)
    if (props.adminMode) {
      this.state.adminMode = props.adminMode
    }
    if (props.regions && props.regions.length) {
      this.state.pageId = props.regions[0].pageId
    }
  }

  componentWillReceiveProps({ pageId }) {
    this.setState({
      pageId
    })
  }

  switchComponent = (regionArray) => {
    // Hack alert!
    // Aggregating news because my data model didn't account for it well enough
    let newsArray = regionArray.filter(r => r['newsHeadline'])
    let newsRendered = false

    if ((!regionArray || !regionArray.length || ! _some(regionArray, r => _some(Object.keys(identifyingComponentFields), f => r[f]))) && this.state.adminMode) {
      return (
        <div>
          <ModalWithHandlers
            {...this.props}
            pageId={this.state.pageId}
            orderId={0}
          >
            <div>Add first region</div>
          </ModalWithHandlers>
        </div>
      )
    }

    return _orderBy(regionArray, ['orderWeight'], ['asc']).map((region, i) => {
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

            { _orderBy(newsArray, ['published'], ['asc']).map((news, ni) => {
              return this.state.adminMode
                ? <ModalWithHandlers
                  {...this.props}
                  key={`news-${ni}`}
                  table={identifiedRegion.table}
                  data={news}
                  pageId={this.state.pageId}
                  orderId={_get(newsArray, `[${newsArray.length -1}].orderWeight`, 0) + 1}
                >
                  <RegionComponent data={news} />
                </ModalWithHandlers>
                : (
                <RegionComponent key={`news-${ni}`} data={news} />
              )
            })}
          </div>

        )
      } else if (identifiedRegion.table == 'news') {
        // wow
        return null
      }

      if (this.state.adminMode) {
        if (i === 0) {
          return (
            <div className="firstRegion" key={i}>
              <ModalWithHandlers
                {...this.props}
                pageId={this.state.pageId}
                orderId={0}
              >
                <div />
              </ModalWithHandlers>
              <ModalWithHandlers
                {...this.props}
                table={identifiedRegion.table}
                data={region}
                pageId={this.state.pageId}
                orderId={_get(region, 'orderWeight') + 1}
              >
                <RegionComponent data={region} />
              </ModalWithHandlers>
            </div>
          )
        }
        return (
          <ModalWithHandlers
            {...this.props}
            key={i}
            table={identifiedRegion.table}
            data={region}
            pageId={this.state.pageId}
            orderId={_get(region, 'orderWeight') + 1}
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
        <Menu siteMap={this.props.siteMap} />

        <div className="main-content">
          {this.switchComponent(regions)}
        </div>
      </div>
    )
  }
}

export default Layout