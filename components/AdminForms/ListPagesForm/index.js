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
    if (window.localStorage.getItem('buildRateLimited') === "false"){
      console.log('current build rate limit: ', window.localStorage.getItem('buildRateLimited'))
      window.localStorage.setItem('buildRateLimited', true)

      setTimeout(() => {
        console.log('build rate limit removed, fire away!')
        window.localStorage.setItem('buildRateLimited', false)
      }, 18000)

      this.state.handleRebuild()
    } else {
      console.log('build is currently rate limited, wait 5 minutes and try again')
    }
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