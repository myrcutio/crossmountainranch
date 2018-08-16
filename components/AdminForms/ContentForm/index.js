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
    await this.state.handleCreate({table: this.state.table, body: this.state.componentData})
    this.state.handleGet({table: this.state.table})
  }

  handleDelete = (id) => async () => {
    await this.state.handleDelete({table: this.state.table, id})
    this.state.handleGet({table: this.state.table})
  }

  handlePopulate = (table) => () => {
    this.state.handleGet({table})
  }

  render() {
    return (
      <ul>
        <button onClick={this.handlePopulate(this.state.table)}>Populate {this.state.table}</button>
        { this.state.data && this.state.data.length ? this.state.data.map((c, i) => (
          <li key={i}>
            <div>ID: {c.id}</div>
            {
              componentMappings[this.state.table] ? componentMappings[this.state.table].map((mapping, ind) => {
                return c[mapping] ? <div key={ind}>{mapping}: {c[mapping]}</div> : null
              }) : null
            }
            <button onClick={this.handleDelete(c.id)}>X</button>
          </li>
        )) : null}
        {
          componentMappings[this.state.table] ? componentMappings[this.state.table].map((mapping, ind) => {
            return (
              <div key={ind}>
                {mapping}: <input name={mapping} onChange={this.handleOnChange(mapping)} />
              </div>
            )
          }) : null
        }
        <button onClick={this.handleCreate}>Add to {this.state.table}</button>
      </ul>
    )
  }
}