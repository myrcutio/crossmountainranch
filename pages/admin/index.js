import fetch from 'isomorphic-fetch'
import { Component } from 'react'

import Amplify, { API, Storage } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'
import Spinner from '../../components/Spinner'
import _get from 'lodash.get'
import _find from 'lodash.find'
import { confirmAlert } from 'react-confirm-alert'
import routes from '../../routes.es6'

import CreatePageForm from "../../components/AdminForms/CreatePageForm"
import PageRebuild from "../../components/AdminForms/PageRebuild"
import Layout from "../../components/Layout"
import { prodApiEndpoint } from '../../data/aws-exports'
import { amplifyConfig } from '../../data/aws-exports'

Amplify.configure(amplifyConfig)

class Admin extends Component {
  state = {
    currentPage: '',
    pageId: null,
    regions: {},
    news: [],
    sections: [],
    pages: [],
    siteMap: {},
    notices: [],
    documents: [],
    committees: [],
    members: [],
    isLoading: false
  }

  componentWillMount = async () => {
    window.addEventListener("hashchange", this.handlePageNavigate, false)
    this.handlePageNavigate()
  }
  componentWillUnmount() {
    window.removeEventListener("hashchange", this.handlePageNavigate, false);
  }

  handlePageNavigate = () => {
    let currentPage = '/'
    if (location && location.hash) {
      currentPage = _get(location.hash.split('#'), '[1]', '/')
    }
    this.setState({
      currentPage,
      isLoading: true
    })
    this.getPages()
  }

  handleCreate = async ({ slug, label }) => {
    this.setState({
      isLoading: true
    })
    await API.post("ProdAPI", "/page", {
      body: { slug, label }
    })
    if (location) {
      location.hash = `#${slug}`
    } else {
      this.getPages()
    }
  }

  handleDelete = async (id) => {
    if (typeof id !== 'number' && this.state.pageId !== null) {
      id = this.state.pageId
    } else {
      console.log('Deleted page id: ', this.state.pageId)
    }
    // TODO: add a confirmation modal or alert
    this.setState({
      isLoading: true
    })
    if (typeof id === 'number' && id !== null) {
      await API.del("ProdAPI", `/page/${id}`)
    } else {
      console.error('Page ID is null')
    }
    if (location) {
      location.hash = `#/`
    } else {
      this.getPages()
    }
  }

  confirmAction = (title, message, callback) => () => {
    confirmAlert({
      title,
      message,
      buttons: [
        {
          label: 'Yes',
          onClick: callback
        },
        {
          label: 'No',
          onClick: () => {console.log('abandoned action')}
        }
      ]
    })
  };

  getPages = async () => {
    const pages = await (await fetch(`${prodApiEndpoint}/routes`)).json()
    const siteMap = await routes()

    const data = await (await fetch(`${prodApiEndpoint}/path${this.state.currentPage}`)).json()
    this.setState({
      pages,
      regions: {
        [this.state.currentPage]: data.regions
      },
      pageId: _get(_find(pages, (page) => page.slug === this.state.currentPage), 'id', null),
      siteMap,
      isLoading: false
    })
  }

  handleGetPage = async (slug) => {
    this.setState({
      isLoading: true
    })
    const data = await (await fetch(`${prodApiEndpoint}/path${slug || this.state.currentPage}`)).json()
    this.setState({
      regions: {
        [slug]: data.regions
      },
      currentPage: slug,
      pageId: _get(_find(this.state.pages, page => page.slug === slug), 'id'),
      isLoading: false
    })
  }

  handleContentCreate = ({table, body}) => {
    this.setState({
      isLoading: true
    })
    return API.post("ProdAPI", `/${table}`, {
      body
    })
  }
  handleContentUpdate = ({table, body, id}) => {
    this.setState({
      isLoading: true
    })
    return API.put("ProdAPI", `/${table}/${id}`, {
      body
    })
  }
  handleContentDelete = ({table, id}) => {
    this.setState({
      isLoading: true
    })
    return API.del("ProdAPI", `/${table}/${id}`)
  }

  handleGetTable = async ({table}) => {
    this.setState({
      isLoading: true
    })
    const tableData = await API.get("ProdAPI", `/${table}`)

    const data = await (await fetch(`${prodApiEndpoint}/path${this.state.currentPage}`)).json()
    const currentPageSlug = this.state.currentPage !== "" ? this.state.currentPage : '/'
    this.setState({
      [table]: tableData,
      regions: {
        [this.state.currentPage]: data.regions
      },
      pageId: _get(_find(this.state.pages, page => page.slug === currentPageSlug), 'id'),
      isLoading: false
    })
  }

  handleRebuild = async () => {
    return API.patch("BuildAPI", "")
  }

  render() {
    return (
      <div>
        { this.state.isLoading ? <Spinner name="line-scale"/> : null}
        <div className="adminControls">
          <PageRebuild handleRebuild={this.handleRebuild}/>
        </div>
        <Layout
          handleUpdate={this.handleContentUpdate}
          handleCreate={this.handleContentCreate}
          handleDelete={this.handleContentDelete}
          handleGet={this.handleGetTable}
          adminMode="true"
          storage={Storage}
          regions={_get(this.state.regions, `[${this.state.currentPage}]`, [])}
          pageId={this.state.pageId}
          siteMap={this.state.siteMap}
        />
        {
          this.state.currentPage === '/' ? null : <button className="deletePageButton" onClick={this.confirmAction('Permanently delete page', 'This action cannot be undone, are you sure?', this.handleDelete)}>Delete this page (THIS CANNOT BE UNDONE)</button>
        }
      </div>
    )
  }
}

export default withAuthenticator(Admin, true)