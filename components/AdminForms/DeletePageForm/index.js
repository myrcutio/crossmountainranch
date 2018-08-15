import { Component } from 'react'

export default class DeletePageForm extends Component {
  state = {
    id: null,
    slug: '',
    label: ''
  }


  static getInitialProps({ handleSubmit }) {
    return { handleSubmit }
  }

  handleDelete = (event) => {
    this.props.handleSubmit(this.state)
    event.preventDefault();
  }


  render() {
    return (
      <li>
        {this.state.slug} : {this.state.label} <button onClick={this.handleDelete}>X</button>
      </li>
    )
  }
}