import { Component } from 'react'
import _get from 'lodash.get'

import componentMappings from '../../../data/componentFieldMapping'
import S3ImageUpload from "../S3UploadForm"
import { s3FileEndpoint }from '../../../data/aws-exports'
import tableIds from '../../../data/tableIdMapping'

const inputFieldOverrides = {
  published: {
    type: 'date'
  },
  noticeDate: {
    type: 'date'
  },
  pageOrder: {
    hidden: true
  },
  content: {
    type: 'textarea'
  },
  disclosure: {
    type: 'textarea'
  },
  newsContent: {
    type: 'textarea'
  },
  noticeContent: {
    type: 'textarea'
  }
}

const metaTypes = {
  title: {
    table: 'sections',
    mappings: [
      "title"
    ]
  },
  disclosure: {
    table: 'sections',
    mappings: [
      "disclosure"
    ]
  },
  paragraph: {
    table: 'sections',
    mappings: [
      "content"
    ]
  }
}

export default class ContentForm extends Component {
  state = {
    table: '',
    metaType: null,
    data: {},
    handleDelete: () => {},
    handleGet: () => {},
    handleCreate: () => {},
    handleUpdate: () => {},
    handleOnChange: () => {},
    focusedHandler: () => {},
    isLoading: false
  }

  constructor(props) {
    super(props)
    this.state.handleUpdate = this.props.handleUpdate
    this.state.handleCreate = this.props.handleCreate
    this.state.handleDelete = this.props.handleDelete
    this.state.handleGet = this.props.handleGet
    this.state.table = this.props.table
    this.state.data = _get(this.props, 'data', {})
    this.state.metaType = _get(this.props, 'data.componentType', null)
  }

  componentWillReceiveProps({ table, data, handleDelete, handleGet, handleCreate, handleUpdate}) {
    this.setState({
      table,
      data,
      handleDelete,
      handleGet,
      handleCreate,
      handleUpdate,
      metaType: _get(data, 'componentType', null)
    })
  }

  handleOnChange = (field) => (event) => {
    let newValue = _get(event, 'target.value', ' ')

    // MYSQL doesn't update fields with empty values, so setting the value to a space instead
    if (event.target.value.length === 0) {
      newValue = ' '
    }
    this.setState({
      data: {
        ...this.state.data,
        [field]: newValue
      }
    })
  }

  cleanupPageField = (newPageData) => {
    newPageData.slug = _get(newPageData, 'slug', '').trim()
    if (!newPageData.slug.startsWith('/')) {
      newPageData.slug = `/${newPageData.slug}`
    }
    return newPageData
  }

  handleCreate = async () => {
    let table = this.state.table
    let createBody
    if (table === 'pages') {
      createBody = this.cleanupPageField(this.state.data)
      createBody.pageOrder = this.props.orderId
      table = 'page' // this forces it to use the page api endpoint, not the content table one
    } else {
      createBody = this.state.data
    }
    const createId = _get(await this.state.handleCreate({table, body: createBody}), 'message.insertId')
    if (createId && this.props.pageId && table !== 'pages') {
      const pageAssociationParams = {
        table: 'pageContentMaps',
        body: {
          pageId: this.props.pageId,
          [tableIds[table]]: createId,
          orderWeight: this.props.orderId
        }
      }
      await this.state.handleCreate(pageAssociationParams)
    }
    if (table === 'page') {
      location.hash = `#${_get(createBody, 'slug', '/')}`
    } else {
      this.state.handleGet({table})
    }
    if (typeof this.props.callback === 'function') {
      this.props.callback()
    }
  }

  handleUpdate = async () => {
    const table = this.state.table
    await this.state.handleUpdate({table, body: this.state.data, id: _get(this.props.data, tableIds[table])})
    this.state.handleGet({table})
    if (typeof this.props.callback === 'function') {
      this.props.callback()
    }
  }

  handleDelete = (id) => async () => {
    const table = this.state.table
    await this.state.handleDelete({table, id})
    this.state.handleGet({table})
    if (typeof this.props.callback === 'function') {
      this.props.callback()
    }
  }

  handleUploadFile = (result) => {
    if (result.key) {
      this.setState({
        data: {
          ...this.state.data,
          docUrl: `${s3FileEndpoint}${result.key}`
        }
      })
    }
  }

  handleSelectTable = (table, metaType) => () => {
    this.setState({
      table,
      metaType
    })
  }

  render() {
    const componentFields = _get(metaTypes, `[${this.state.metaType}].mappings`, componentMappings[this.state.table])
    return (
      <ul>
        {
          !this.state.table
            ? <div className="tableChoices">
                <h2>Select content type:</h2>
                <div><div className="section-type" onClick={this.handleSelectTable('sections', 'title')}>Title</div></div>
                <div><div className="section-type" onClick={this.handleSelectTable('sections', 'disclosure')}>Disclosure</div></div>
                <div><div className="section-type" onClick={this.handleSelectTable('sections', 'paragraph')}>Paragraph</div></div>
                <div><div className="section-type" onClick={this.handleSelectTable('news')}>News</div></div>
                <div><div className="section-type" onClick={this.handleSelectTable('documents')}>Document</div></div>
                <div><div className="section-type" onClick={this.handleSelectTable('notices')}>Notice</div></div>
                <div><div className="section-type" onClick={this.handleSelectTable('committeeMembers')}>Committee Member</div></div>
              </div>
            : null
        }
        {
          componentFields && componentFields.length ? componentFields.map((mapping, ind) => {
            return (
              <div key={ind}>
                {
                  this.state.table === 'documents' && mapping === 'docUrl' ? <S3ImageUpload storage={this.props.storage} callback={this.handleUploadFile}/>
                    : _get(inputFieldOverrides, `[${mapping}].hidden`) ? null
                    : <div>
                        <span className="section-label">{mapping}:</span>
                        { _get(inputFieldOverrides, `[${mapping}].type`) === 'textarea'
                          ? <textarea
                              rows="8"
                              name={mapping}
                              value={_get(this.state.data, mapping, ' ')}
                              onChange={this.handleOnChange(mapping)}
                            />
                          : <input
                              name={mapping}
                              value={_get(this.state.data, mapping, ' ')}
                              onChange={this.handleOnChange(mapping)}
                              type={_get(inputFieldOverrides, `[${mapping}].type`, "text")}
                            />
                        }
                      </div>
                }
              </div>
            )
          }) : null
        }
        {
          _get(this.props.data, 'id')
          ? <button className="add-update-section" onClick={this.handleUpdate}>Update {this.state.table}</button>
          : this.state.table ? <button className="add-update-section" onClick={this.handleCreate}>Add new {this.state.table}</button> : null
        }
        {
          _get(this.props.data, tableIds[this.state.table])
            ? <button className="delete-section" onClick={this.handleDelete(_get(this.props.data, tableIds[this.state.table]))}>Delete</button>
            : null
        }
      </ul>
    )
  }
}
