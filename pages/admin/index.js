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
    members: []
  }

  componentWillMount = async () => {
    this.getPages()
  }

  handleCreate = async ({ slug, label }) => {
    await API.post("ProdAPI", "/page", {
      body: { slug, label }
    })
    this.getPages()
  }

  handleDelete = async (id) => {
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
      siteMap
    })
  }

  handleGetPage = async (slug) => {
    const data = await (await fetch(`${prodApiEndpoint}/path${slug || this.state.currentPage}`)).json()
    console.log('looking for ', slug, ' in ', this.state.pages)
    this.setState({
      regions: {
        [slug]: data.regions
      },
      currentPage: slug,
      pageId: _find(this.state.pages, page => page.slug === slug, {}).id
    })
  }

  handleCreateSection = (body) => async () => {
    await API.post("ProdAPI", `/sections`, body)
  }

  handleCreateNews = ({ newsHeadline, newsSubtitle, newsContent}) => async () => {
    await API.post("ProdAPI", `/news`, {
      body: { newsHeadline, newsSubtitle, newsContent}
    })
  }

  handleContentCreate = ({table, body}) => {
    return API.post("ProdAPI", `/${table}`, {
      body
    })
  }
  handleContentUpdate = ({table, body, id}) => {
    return API.put("ProdAPI", `/${table}/${id}`, {
      body
    })
  }
  handleContentDelete = ({table, id}) => {
    return API.del("ProdAPI", `/${table}/${id}`)
  }

  handleGetTable = async ({table}) => {
    const tableData = await API.get("ProdAPI", `/${table}`)

    const data = await (await fetch(`${prodApiEndpoint}/path${this.state.currentPage}`)).json()
    const currentPageSlug = this.state.currentPage !== "" ? this.state.currentPage : '/'
    console.log('looking for ', currentPageSlug, ' in ', this.state.pages)
    this.setState({
      [table]: tableData,
      regions: {
        [this.state.currentPage]: data.regions
      },
      pageId: _get(_find(this.state.pages, page => page.slug === currentPageSlug), 'id')
    })
  }

  render() {
    return (
      <div>
        <div className="adminControls">
          <CreatePageForm handleSubmit={this.handleCreate} />
          <ListPagesForm pages={this.state.pages} handleSelectPage={this.handleGetPage} handleDelete={this.handleDelete} />
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