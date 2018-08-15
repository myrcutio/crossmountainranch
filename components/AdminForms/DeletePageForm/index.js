import { Component } from 'react'

export default class DeletePageForm extends Component {
  state = {
    pages: [],
    handleSubmit: () => {}
  }

  componentWillReceiveProps({ pages, handleSubmit }) {
    this.setState({
      pages,
      handleSubmit
    })
  }

  handleDelete = (id) => () => {
    this.state.handleSubmit(id)
  }

  render() {
    return (
      <ul>
        { this.state.pages && this.state.pages.length ? this.state.pages.map((p, i) => (
          <li key={i}>{p.slug} : {p.label} <button onClick={this.handleDelete(p.id)}>X</button></li>
        )) : null}
      </ul>
    )
  }
}