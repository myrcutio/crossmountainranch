import fetch from 'isomorphic-fetch'
import { Component } from 'react'

import Amplify, { API } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'

import CreatePageForm from "../../components/AdminForms/CreatePageForm"
import DeletePageForm from "../../components/AdminForms/DeletePageForm";

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
    pages: []
  }

  componentWillMount = async () => {
    const pages = await (await fetch(`${ProdAPIEndpoint}/path`)).json()
    this.setState({
      pages
    })
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

  render() {
    return (
      <div className="main">
        <CreatePageForm handleSubmit={this.handleCreate} />
        <DeletePageForm pages={this.state.pages} handleSubmit={this.handleDelete} />
      </div>
    )
  }
}

export default withAuthenticator(Admin, true)
