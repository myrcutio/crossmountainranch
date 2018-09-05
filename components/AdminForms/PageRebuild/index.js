import { Component } from 'react'
import Spinner from '../../Spinner'
import { statusBadge } from '../../../data/aws-exports'

export default class PageRebuild extends Component {
  state = {
    handleRebuild: () => {},
    buildStatus: statusBadge,
    isLoading: false
  }

  componentWillReceiveProps({ pages, handleDelete, handleSelectPage, handleRebuild}) {
    this.setState({
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
      <div className="build-status">
        { this.state.isLoading ? <Spinner name="line-scale"/> : null}
        Build Status: <img src={this.state.buildStatus} />
        <div>
          <button className="updateSiteButton" onClick={this.handleRebuild}>Update live site with ALL changes to ALL pages (THIS CANNOT BE UNDONE)</button>
        </div>
      </div>
    )
  }
}
