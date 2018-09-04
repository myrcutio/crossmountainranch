import { Component } from 'react'
import _get from "lodash.get"
import _orderBy from 'lodash.orderby'
import ModalWithHandlers from '../AdminForms/ModalWithHandlers'

class Menu extends Component {
  render () {
    return (
      <div className="menu">
        {this.props.siteMap && Object.keys(this.props.siteMap).length ? _orderBy(Object.keys(this.props.siteMap), k => _get(this.props.siteMap[k], 'pageOrder'), ['ASC']).map((l, i) => {
          const menuLink = `${this.props.adminMode ? '/admin/#' : ''}${l}`

          if (this.props.adminMode) {
            return this.props.siteMap[l].menu !== false ? (
              <div key={i}>
                {
                  i === 0 ? (
                    <ModalWithHandlers
                      {...this.props}
                      key={`menuInitCreateModal-${i}`}
                      table="page"
                      orderId={0}
                    ></ModalWithHandlers>
                  ) : null
                }
                <div key={i} className="menu-item">
                  <a href={menuLink}>{this.props.siteMap[l].label}</a>
                </div>
                <ModalWithHandlers
                  {...this.props}
                  key={`menuCreateModal-${i}`}
                  table="page"
                  orderId={i+1}
                ></ModalWithHandlers>
              </div>
            ) : null
          }
          return this.props.siteMap[l].menu !== false ? (
            <div key={i} className="menu-item">
              <a href={menuLink}>{this.props.siteMap[l].label}</a>
            </div>
          ) : null
        }) : null}
      </div>
    )
  }
}

export default Menu