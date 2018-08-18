import fetch from 'isomorphic-fetch'
import { Component } from 'react'

import Amplify, { API, Storage } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'

import CreatePageForm from "../../components/AdminForms/CreatePageForm"
import ListPagesForm from "../../components/AdminForms/ListPagesForm"
import Layout from "../../components/Layout"
import ModalWithHandlers from '../../components/AdminForms/ModalWithHandlers'
import { prodApiEndpoint } from '../../data/aws-exports'
import { amplifyConfig } from '../../data/aws-exports'

Amplify.configure(amplifyConfig)

class Admin extends Component {
  state = {
    currentPage: 'homepage',
    regions: {},
    news: [],
    sections: [],
    pages: [],
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
    const pages = await (await fetch(`${prodApiEndpoint}/path`)).json()
    const data = await (await fetch(`${prodApiEndpoint}/path/${this.state.currentPage}`)).json()
    this.setState({
      pages,
      regions: {
        [this.state.currentPage]: data.regions
      }
    })
  }

  handleGetPage = async (slug) => {
    const data = await (await fetch(`${prodApiEndpoint}/path/${slug || this.state.currentPage}`)).json()
    this.setState({
      regions: {
        [slug]: data.regions
      },
      currentPage: slug
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

    const data = await (await fetch(`${prodApiEndpoint}/path/${this.state.currentPage}`)).json()
    this.setState({
      [table]: tableData,
      regions: {
        [this.state.currentPage]: data.regions
      }
    })
  }

  render() {
    return (
      <div>
        <div className="adminControls">
          <CreatePageForm handleSubmit={this.handleCreate} />
          <ListPagesForm pages={this.state.pages} handleSelectPage={this.handleGetPage} handleDelete={this.handleDelete} />
          <ModalWithHandlers
            table='documents'
            handleUpdate={this.handleContentUpdate}
            handleCreate={this.handleContentCreate}
            handleDelete={this.handleContentDelete}
            handleGet={this.handleGetTable}
            storage={Storage}
          >
            <span>Create Document</span>
          </ModalWithHandlers>
          <ModalWithHandlers
            table='pageContentMaps'
            handleUpdate={this.handleContentUpdate}
            handleCreate={this.handleContentCreate}
            handleDelete={this.handleContentDelete}
            handleGet={this.handleGetTable}
          >
            <span>Add Document To Page</span>
          </ModalWithHandlers>
        </div>
        {
          this.state.currentPage &&
          this.state.regions[this.state.currentPage] &&
          this.state.regions[this.state.currentPage].length ?
            <Layout
              handleUpdate={this.handleContentUpdate}
              handleCreate={this.handleContentCreate}
              handleDelete={this.handleContentDelete}
              handleGet={this.handleGetTable}
              adminMode="true"
              regions={this.state.regions[this.state.currentPage]}
            />
          : null
        }
      </div>
    )
  }
}

export default withAuthenticator(Admin, true)
