import Obfuscate from 'react-obfuscate'
import { Component } from 'react'

class ObfuscatedEmail extends Component {
  render() {
    return (
      <div>
        <span className="contact-label">Email:</span> <Obfuscate email={this.props.data.email} />
      </div>
    )
  }
}

export default ObfuscatedEmail