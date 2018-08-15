import fetch from 'isomorphic-fetch'
import { Component } from 'react'

import Amplify, { API } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'

import CreatePageForm from "../../components/AdminForms/CreatePageForm"
import ListPagesForm from "../../components/AdminForms/ListPagesForm";
import Layout from "../../components/Layout";

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
    pages: [],
    currentPage: '',
    regions: {}
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
    this.setState({
        pages
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

  handleCreateSection = ({ title, content }) => async () => {
    await API.post("ProdAPI", `/sections`, {
      body: { title, content }
    })
  }

  handleCreateNews = ({ newsHeadline, newsSubtitle, newsContent}) => async () => {
    await API.post("ProdAPI", `/news`, {
      body: { newsHeadline, newsSubtitle, newsContent}
    })
  }

  render() {
    return (
      <div>
        <div className="main">
          <CreatePageForm handleSubmit={this.handleCreate} />
          <ListPagesForm pages={this.state.pages} handleSelectPage={this.handleGetPage} handleDelete={this.handleDelete} />
          <button onClick={this.handleCreateSection({ title: "test title", content: "test contents!"})}>create section</button>

          <button onClick={this.handleCreateNews({
            newsHeadline: "extra extra!",
            newsSubtitle: "read all about it",
            newsContent: "dang"
          })}>create news</button>
        </div>
        {
          this.state.currentPage && this.state.regions[this.state.currentPage].length  ? <Layout regions={this.state.regions[this.state.currentPage]}/> : null
        }
      </div>
    )
  }
}

export default withAuthenticator(Admin, true)
