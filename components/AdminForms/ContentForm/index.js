import { Component } from 'react'
import _get from 'lodash.get'

import componentMappings from '../../../data/componentFieldMapping'
import S3ImageUpload from "../S3UploadForm"
import { s3FileEndpoint }from '../../../data/aws-exports'
import tableIds from '../../../data/tableIdMapping'

export default class ContentForm extends Component {
  state = {
    table: '',
    data: {},
    handleDelete: () => {},
    handleGet: () => {},
    handleCreate: () => {},
    handleUpdate: () => {},
    handleOnChange: () => {}
  }

  constructor(props) {
    super(props)
    this.state.handleUpdate = this.props.handleUpdate
    this.state.handleCreate = this.props.handleCreate
    this.state.handleDelete = this.props.handleDelete
    this.state.handleGet = this.props.handleGet
    this.state.table = this.props.table
    this.state.data = _get(this.props, 'data', {})
  }

  componentWillReceiveProps({ table, data, handleDelete, handleGet, handleCreate, handleUpdate}) {
    this.setState({
      table,
      data,
      handleDelete,
      handleGet,
      handleCreate,
      handleUpdate
    })
  }

  handleOnChange = (field) => (event) => {
    this.setState({
      data: {
        ...this.state.data,
        [field]: event.target.value
      }
    })
  }

  handleCreate = async () => {
    const createId = _get(await this.state.handleCreate({table: this.state.table, body: this.state.data}), 'message.insertId')
    if (createId && this.props.pageId) {
      const pageAssociationParams = {
        table: 'pageContentMaps',
        body: {
          pageId: this.props.pageId,
          [tableIds[this.state.table]]: createId,
          orderWeight: this.props.orderId
        }
      }
      await this.state.handleCreate(pageAssociationParams)
    }
    this.state.handleGet({table: this.state.table})
    if (typeof this.props.callback === 'function') {
      this.props.callback()
    }
  }

  handleUpdate = async () => {
    await this.state.handleUpdate({table: this.state.table, body: this.state.data, id: _get(this.props.data, tableIds[this.state.table])})
    this.state.handleGet({table: this.state.table})
    if (typeof this.props.callback === 'function') {
      this.props.callback()
    }
  }

  handleDelete = (id) => async () => {
    await this.state.handleDelete({table: this.state.table, id})
    this.state.handleGet({table: this.state.table})
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

  handleSelectTable = table => () => {
    this.setState({
      table
    })
  }

  render() {
    return (
      <ul>
        {
          !this.state.table
            ? <div className="tableChoices">
                <div>Order Index: {this.props.orderId}</div>
                <div>Select content type: </div>
                <button onClick={this.handleSelectTable('sections')}>Section</button>
                <button onClick={this.handleSelectTable('news')}>News</button>
                <button onClick={this.handleSelectTable('documents')}>Document</button>
                <button onClick={this.handleSelectTable('notices')}>Notice</button>
                <button onClick={this.handleSelectTable('committeeMembers')}>Committee Member</button>
              </div>
            : null
        }
        {
          _get(this.props.data, tableIds[this.state.table])
            ? <div>
                Current Order Index: {this.props.data.orderWeight}
                <button onClick={this.handleDelete(_get(this.props.data, tableIds[this.state.table]))}>Delete</button>
              </div>
            : null
        }
        {
          componentMappings[this.state.table] ? componentMappings[this.state.table].map((mapping, ind) => {
            return (
              <div key={ind}>
                {
                  this.state.table === 'documents' && mapping === 'docUrl' ? <S3ImageUpload storage={this.props.storage} callback={this.handleUploadFile}/>
                    : <div>
                        {mapping}:
                          <input
                            name={mapping}
                            value={_get(this.state.data, mapping, ' ')}
                            onChange={this.handleOnChange(mapping)}
                          />
                      </div>
                }
              </div>
            )
          }) : null
        }
        {
          _get(this.props.data, 'id')
          ? <button onClick={this.handleUpdate}>Update {`${this.state.table}, id: ${_get(this.props.data, tableIds[this.state.table])}`}</button>
          : this.state.table ? <button onClick={this.handleCreate}>Add new {this.state.table}</button> : null
        }
      </ul>
    )
  }
}