import { Component } from 'react'

export default class CreatePageForm extends Component {
  state = {
    slug: '',
    label: ''
  }

  static getInitialProps({ handleSubmit }) {
    return { handleSubmit }
  }

  handleSubmitCreatePage = (event) => {
    this.props.handleSubmit(this.state)
    event.preventDefault();
  }

  handleOnChange = (stateValue) => (event) => {
    this.setState({
      [stateValue]: event.target.value
    })
  }

  render() {
    return (
      <div className="main">
        <div className="createNewPageSection">
          <div>Slug: <input name="slug" onChange={this.handleOnChange("slug")} /></div>
          <div>Label: <input name="label" onChange={this.handleOnChange("label")} /></div>
          <button onClick={this.handleSubmitCreatePage}>Create New Page</button>
        </div>
      </div>
    )
  }
}