import { Component } from 'react'

export default class ListPagesForm extends Component {
  state = {
    pages: [],
    handleDelete: () => {},
    handleSelectPage: () => {},
    handleRebuild: () => {}
  }

  componentWillReceiveProps({ pages, handleDelete, handleSelectPage, handleRebuild}) {
    this.setState({
      pages,
      handleDelete,
      handleSelectPage,
      handleRebuild
    })
  }

  handleDelete = (id) => () => {
    this.state.handleDelete(id)
  }

  handleSelectPage = (slug) => () => {
    this.state.handleSelectPage(slug)
  }

  handleRebuild = () => {
    this.state.handleRebuild()
  }

  render() {
    return (
      <ul>
        <button onClick={this.handleRebuild}>Update live site (trigger a new build and flush cache)</button>
        { this.state.pages && this.state.pages.length ? this.state.pages.map((p, i) => (
          <li key={i}>
            <button onClick={this.handleSelectPage(p.slug)}>{`Edit ${p.slug}`}</button>
            <button onClick={this.handleDelete(p.id)}>Delete Page (WARNING! This cannot be undone)</button>
          </li>
        )) : null}
      </ul>
    )
  }
}