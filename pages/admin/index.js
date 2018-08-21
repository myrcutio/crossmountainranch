import fetch from 'isomorphic-fetch'
import { Component } from 'react'

import Amplify, { API, Storage } from 'aws-amplify'
import {
  Greetings,
  SignIn,
  ConfirmSignIn,
  RequireNewPassword,
  SignUp,
  ConfirmSignUp,
  VerifyContact,
  ForgotPassword,
  TOTPSetup,
  withAuthenticator } from 'aws-amplify-react'
import Spinner from '../../components/Spinner'
import _get from 'lodash.get'
import _find from 'lodash.find'
import routes from '../../routes.es6'

import CreatePageForm from "../../components/AdminForms/CreatePageForm"
import ListPagesForm from "../../components/AdminForms/ListPagesForm"
import Layout from "../../components/Layout"
import ModalWithHandlers from '../../components/AdminForms/ModalWithHandlers'
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
    this.setState({
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
    this.getPages()
  }

  handleDelete = async (id) => {
    this.setState({
      isLoading: true
    })
    await API.del("ProdAPI", `/page/${id}`)
    this.getPages()
  }

  getPages = async () => {
    const pages = await (await fetch(`${prodApiEndpoint}/routes`)).json()
    const siteMap = await routes()

    const data = await (await fetch(`${prodApiEndpoint}/path${this.state.currentPage}`)).json()
    this.setState({
      pages,
      regions: {
        [this.state.currentPage]: data.regions
      },
      pageId: _get(data, 'regions[0].pageId'),
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
          <CreatePageForm handleSubmit={this.handleCreate} />
          <ListPagesForm pages={this.state.pages} handleSelectPage={this.handleGetPage} handleDelete={this.handleDelete} handleRebuild={this.handleRebuild}/>
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
      </div>
    )
  }
}

export default withAuthenticator(Admin, true)