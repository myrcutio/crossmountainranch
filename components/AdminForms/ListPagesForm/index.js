import { Component } from 'react'
import Spinner from '../../Spinner'
import { statusBadge } from '../../../data/aws-exports'

export default class ListPagesForm extends Component {
  state = {
    pages: [],
    handleDelete: () => {},
    handleSelectPage: () => {},
    handleRebuild: () => {},
    buildStatus: statusBadge,
    isLoading: false
  }

  componentWillReceiveProps({ pages, handleDelete, handleSelectPage, handleRebuild}) {
    this.setState({
      pages,
      handleDelete,
      handleSelectPage,
      handleRebuild
    })

    const isRateLimited = window.localStorage.getItem('buildRateLimited')
    if (isRateLimited !== null && parseInt(isRateLimited) >= (new Date()).getTime()){
      const rateLimitListener = setInterval(async () => {
        this.setState({
          buildStatus: `${statusBadge}&cached=${(new Date()).getTime()}`
        })
        if (parseInt(isRateLimited) <= (new Date()).getTime()) {
          clearInterval(rateLimitListener)
        }
      }, 3000)
    }
  }

  handleDelete = (id) => () => {
    this.state.handleDelete(id)
  }

  handleSelectPage = (slug) => () => {
    this.state.handleSelectPage(slug)
  }

  handleRebuild = () => {
    const isRateLimited = window.localStorage.getItem('buildRateLimited')
    if (isRateLimited === null || parseInt(isRateLimited) <= (new Date()).getTime()){
      this.setState({
        isLoading: true
      })
      this.state.handleRebuild().then(() => {
        window.localStorage.setItem('buildRateLimited', (new Date()).getTime() + 210000)
        this.setState({
          buildStatus: "https://s3.amazonaws.com/codefactory-us-east-1-prod-default-build-badges/inProgress.svg",
          isLoading: false
        })
        setTimeout(() => {
          setInterval(async () => {
            this.setState({
              buildStatus: `${statusBadge}&cached=${(new Date()).getTime()}`
            })
          }, 3000)
        }, 30000)
      })
    } else {
      console.log('build is currently rate limited, wait 3 minutes and try again')
    }
  }

  render() {
    return (
      <ul>
        { this.state.isLoading ? <Spinner name="line-scale"/> : null}
        Live Site Build Status: <img src={this.state.buildStatus} /><button onClick={this.handleRebuild}>Update live site (trigger a new build and flush cache)</button>
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