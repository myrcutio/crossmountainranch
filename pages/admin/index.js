import fetch from 'isomorphic-fetch'
import { Component } from 'react'

import Amplify, { API } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'

import CreatePageForm from "../../components/AdminForms/CreatePageForm"
import ListPagesForm from "../../components/AdminForms/ListPagesForm";
import Layout from "../../components/Layout";
import ContentForm from "../../components/AdminForms/ContentForm";

const ProdAPIEndpoint = "https://is0oiqxqh3.execute-api.us-west-2.amazonaws.com/prod"

Amplify.configure({
  Auth: {
    userPoolId: "us-west-2_EZct9F6QU",
    identityPoolId: "us-west-2:aeb43f0c-11cc-4ef7-851e-8b660d8afc8e",
    region: "us-west-2",
    userPoolWebClientId: "7hfaoesu22u2daj97l4ugs6pdg"
  },
  API: {
    endpoints: [
      {
        name: "ProdAPI",
        endpoint: ProdAPIEndpoint,
        region: "us-west-2",
        service: "execute-api"
      }
    ]
  }
})

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
    const pages = await (await fetch(`${ProdAPIEndpoint}/path`)).json()
    const data = await (await fetch(`${ProdAPIEndpoint}/path/${this.state.currentPage}`)).json()
    this.setState({
      pages,
      regions: {
        [this.state.currentPage]: data.regions
      }
    })
  }

  handleGetPage = async (slug) => {
    const data = await (await fetch(`${ProdAPIEndpoint}/path/${slug}`)).json()
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

    const data = await (await fetch(`${ProdAPIEndpoint}/path/${this.state.currentPage}`)).json()
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
          <ContentForm
            table="news"
            data={this.state.news}
            handleGet={this.handleGetTable}
            handleCreate={this.handleContentCreate}
            handleDelete={this.handleContentDelete}
            handleUpdate={this.handleContentUpdate}
          />
          <ContentForm
            table="sections"
            data={this.state.sections}
            handleGet={this.handleGetTable}
            handleCreate={this.handleContentCreate}
            handleDelete={this.handleContentDelete}
            handleUpdate={this.handleContentUpdate}
          />
          <ContentForm
            table="notices"
            data={this.state.notices}
            handleGet={this.handleGetTable}
            handleCreate={this.handleContentCreate}
            handleDelete={this.handleContentDelete}
            handleUpdate={this.handleContentUpdate}
          />
          <ContentForm
            table="pageContentMaps"
            data={this.state.pageContentMaps}
            handleGet={this.handleGetTable}
            handleCreate={this.handleContentCreate}
            handleDelete={this.handleContentDelete}
            handleUpdate={this.handleContentUpdate}
          />
        </div>
        {
          this.state.currentPage && this.state.regions[this.state.currentPage] && this.state.regions[this.state.currentPage].length  ? <Layout regions={this.state.regions[this.state.currentPage]}/> : null
        }
      </div>
    )
  }
}

export default withAuthenticator(Admin, true)
