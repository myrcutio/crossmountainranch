import { Component } from 'react'
import _get from 'lodash.get'
import ReactMde from "react-mde"
import * as Showdown from "showdown"

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
  markdown: {
    type: 'markdown'
  }
}

const metaTypes = {
  title: {
    table: 'sections',
    mappings: [
      "title",
      "subtitle"
    ]
  },
  disclosure: {
    table: 'sections',
    mappings: [
      "disclosure"
    ]
  },
  email: {
    table: 'emails',
    mappings: [
      "email"
    ]
  },
  paragraph: {
    table: 'sections',
    mappings: [
      "content"
    ]
  },
  news: {
    table: 'news',
    mappings: componentMappings['news']
  },
  notice: {
    table: 'notices',
    mappings: componentMappings['notices']
  },
  committeeMember: {
    table: 'committeeMembers',
    mappings: componentMappings['committeeMembers']
  },
  markdownBlock: {
    table: 'markdownBlocks',
    mappings: componentMappings['markdownBlocks']
  }
}

export default class ContentForm extends Component {
  converter = Showdown.Converter

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
    isLoading: false,
    mdeState: {
      markdown: '**Hello world!**'
    }
  }

  constructor(props) {
    super(props)
    this.state.handleUpdate = this.props.handleUpdate
    this.state.handleCreate = this.props.handleCreate
    this.state.handleDelete = this.props.handleDelete
    this.state.handleGet = this.props.handleGet
    this.state.table = this.props.table
    this.state.data = _get(this.props, 'data', {})
    if (this.props.data && this.props.data.markdown) {
      this.state.mdeState = {
        markdown: this.props.data.markdown
      }
    }
    this.state.metaType = _get(this.props, 'data.componentType', null)
    this.converter = new Showdown.Converter({tables: true, simplifiedAutoLink: true})
  }

  componentWillReceiveProps({ table, data, handleDelete, handleGet, handleCreate, handleUpdate}) {
    let mdeState = {
      markdown: ''
    }
    if (data && data.markdown) {
      mdeState.markdown = data.markdown
    }
    this.setState({
      table,
      data,
      handleDelete,
      handleGet,
      handleCreate,
      handleUpdate,
      mdeState: {
        ...mdeState
      },
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

  handleMarkdownChange = (mdeState) => {
    this.setState({
      mdeState,
      data: {
        ...this.state.data,
        markdown: mdeState.markdown
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
                <div>Select content type: </div>
                <button onClick={this.handleSelectTable('sections', 'title')}>Title</button>
                <button onClick={this.handleSelectTable('sections', 'disclosure')}>Disclosure</button>
                <button onClick={this.handleSelectTable('sections', 'paragraph')}>Paragraph</button>
                <button onClick={this.handleSelectTable('news', 'news')}>News</button>
                <button onClick={this.handleSelectTable('documents', 'document')}>Document</button>
                <button onClick={this.handleSelectTable('notices', 'notice')}>Notice</button>
                <button onClick={this.handleSelectTable('emails', 'email')}>Email</button>
                <button onClick={this.handleSelectTable('committeeMembers', 'committeeMember')}>Committee Member</button>
                <button onClick={this.handleSelectTable('markdownBlocks', 'markdownBlock')}>Markdown Block</button>
              </div>
            : null
        }
        {
          _get(this.props.data, tableIds[this.state.table])
            ? <div>
                <button onClick={this.handleDelete(_get(this.props.data, tableIds[this.state.table]))}>Delete</button>
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
                        {mapping}:
                        { _get(inputFieldOverrides, `[${mapping}].type`) === 'textarea'
                          ? <textarea
                              name={mapping}
                              value={_get(this.state.data, mapping, ' ')}
                              onChange={this.handleOnChange(mapping)}
                            />
                          : _get(inputFieldOverrides, `[${mapping}].type`) === 'markdown'
                            ? <ReactMde
                                onChange={this.handleMarkdownChange}
                                editorState={this.state.mdeState}
                                layout="horizontal"
                                generateMarkdownPreview={(markdown) => Promise.resolve(this.converter.makeHtml(markdown))}
                              />
                            : <input
                              name={mapping}
                              value={_get(this.state.data, mapping, ' ')}
                              onChange={this.handleOnChange(mapping)}
                              type={_get(inputFieldOverrides, `[${mapping}].type`, null)}
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
          ? <button onClick={this.handleUpdate}>Update {this.state.table}</button>
          : this.state.table ? <button onClick={this.handleCreate}>Add new {this.state.table}</button> : null
        }
      </ul>
    )
  }
}