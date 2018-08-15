import { Component } from 'react'

export default class ListPagesForm extends Component {
  state = {
    pages: [],
    handleDelete: () => {},
    handleSelectPage: () => {}
  }

  componentWillReceiveProps({ pages, handleDelete, handleSelectPage}) {
    this.setState({
      pages,
      handleDelete,
      handleSelectPage
    })
  }

  handleDelete = (id) => () => {
    this.state.handleDelete(id)
  }

  handleSelectPage = (slug) => () => {
    this.state.handleSelectPage(slug)
  }

  render() {
    return (
      <ul>
        { this.state.pages && this.state.pages.length ? this.state.pages.map((p, i) => (
          <li key={i}>
            <button onClick={this.handleSelectPage(p.slug)}>{'<='}</button>
            {p.slug} : {p.label}
            <button onClick={this.handleDelete(p.id)}>X</button>
          </li>
        )) : null}
      </ul>
    )
  }
}