import { Component } from 'react'
import Menu from '../Menu'
import News from '../News'
import Section from '../Section'
import Notice from '../Notice'
import Document from '../Document'
import CommitteeMember from '../CommitteeMember'
import Title from '../Title'
import Disclosure from '../Disclosure'
import Paragraph from '../Paragraph'
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
    component: Title
  },
  content: {
    table: 'sections',
    component: Paragraph
  },
  disclosure: {
    table: 'sections',
    component: Disclosure
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
    if (this.state.adminMode && (!regionArray || !regionArray.length || ! _some(regionArray, r => _some(Object.keys(identifyingComponentFields), f => r[f])))) {
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
        <Menu {...this.props} />

        <div className="main-content">
          {this.switchComponent(regions)}
        </div>
      </div>
    )
  }
}

export default Layout