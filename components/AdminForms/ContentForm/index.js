import { Component } from 'react'
import _get from 'lodash.get'

import componentMappings from '../../../data/componentFieldMapping'
import S3ImageUpload from "../S3UploadForm"
import { s3FileEndpoint }from '../../../data/aws-exports'
import tableIds from '../../../data/tableIdMapping'

export default class ContentForm extends Component {
  state = {
    table: '',
    componentData: {},
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

    this.state.componentData = _get(this.props, 'componentData', {})
  }

  componentWillReceiveProps({ table, componentData, handleDelete, handleGet, handleCreate, handleUpdate}) {
    this.setState({
      table,
      componentData,
      handleDelete,
      handleGet,
      handleCreate,
      handleUpdate
    })
  }

  handleOnChange = (field) => (event) => {
    this.setState({
      componentData: {
        ...this.state.componentData,
        [field]: event.target.value
      }
    })
  }

  handleCreate = async () => {
    await this.state.handleCreate({table: this.props.table, body: this.state.componentData})
    this.state.handleGet({table: this.props.table})
    if (typeof this.props.callback === 'function') {
      this.props.callback()
    }
  }

  handleUpdate = async () => {
    await this.state.handleUpdate({table: this.props.table, body: this.state.componentData, id: _get(this.props.componentData, tableIds[this.props.table])})
    this.state.handleGet({table: this.props.table})
    if (typeof this.props.callback === 'function') {
      this.props.callback()
    }
  }

  handleDelete = (id) => async () => {
    await this.state.handleDelete({table: this.props.table, id})
    this.state.handleGet({table: this.props.table})
    if (typeof this.props.callback === 'function') {
      this.props.callback()
    }
  }

  handlePopulate = (table) => () => {
    this.state.handleGet({table})
  }

  handleUploadFile = (result) => {
    if (result.key) {
      this.setState({
        componentData: {
          ...this.state.componentData,
          docUrl: `${s3FileEndpoint}${result.key}`
        }
      })
    }
  }

  render() {
    return (
      <ul>
        {
          _get(this.props.componentData, tableIds[this.props.table]) ? <button onClick={this.handleDelete(_get(this.props.componentData, tableIds[this.props.table]))}>Delete</button> : null
        }
        {
          componentMappings[this.props.table] ? componentMappings[this.props.table].map((mapping, ind) => {
            return (
              <div key={ind}>
                {
                  this.props.table === 'documents' && mapping === 'docUrl' ? <S3ImageUpload storage={this.props.storage} callback={this.handleUploadFile}/>
                    : <div>
                        {mapping}:
                          <input
                            name={mapping}
                            value={_get(this.state.componentData, mapping, null)}
                            onChange={this.handleOnChange(mapping)}
                          />
                      </div>
                }
              </div>
            )
          }) : null
        }
        {
          _get(this.props.componentData, 'id')
          ? <button onClick={this.handleUpdate}>Update {`${this.props.table}, id: ${_get(this.props.componentData, tableIds[this.props.table])}`}</button>
          : <button onClick={this.handleCreate}>Add new {this.props.table}</button>
        }
      </ul>
    )
  }
}