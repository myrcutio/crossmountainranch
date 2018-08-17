import { Component } from 'react'
import componentMappings from '../../../data/componentFieldMapping'

export default class ContentForm extends Component {
  state = {
    table: '',
    data: [],
    componentData: {},
    handleDelete: () => {},
    handleGet: () => {},
    handleCreate: () => {},
    handleUpdate: () => {},
    handleOnChange: () => {}
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
      componentData: {
        ...this.state.componentData,
        [field]: event.target.value
      }
    })
  }

  handleCreate = async () => {
    await this.state.handleCreate({table: this.props.table, body: this.state.componentData})
    this.state.handleGet({table: this.props.table})
  }

  handleDelete = (id) => async () => {
    await this.state.handleDelete({table: this.props.table, id})
    this.state.handleGet({table: this.props.table})
  }

  handlePopulate = (table) => () => {
    this.state.handleGet({table})
  }

  render() {
    return (
      <ul>
        { this.props.data && this.props.data.length ? this.props.data.map((c, i) => (
          <li key={i}>
            <div>ID: {c.id}</div>
            {
              componentMappings[this.props.table] ? componentMappings[this.props.table].map((mapping, ind) => {
                return c[mapping] ? <div key={ind}>{mapping}: {c[mapping]}</div> : null
              }) : null
            }
            <button onClick={this.handleDelete(c.id)}>Delete</button>
          </li>
        )) : null}
        {
          componentMappings[this.props.table] ? componentMappings[this.props.table].map((mapping, ind) => {
            return (
              <div key={ind}>
                {mapping}: <input name={mapping} onChange={this.handleOnChange(mapping)} />
              </div>
            )
          }) : null
        }
        <button onClick={this.handleCreate}>Add to {this.props.table}</button>
      </ul>
    )
  }
}