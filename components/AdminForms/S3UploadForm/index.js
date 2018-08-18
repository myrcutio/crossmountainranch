import { Component } from 'react'

class S3ImageUpload extends Component {
  onChange(e) {
    const file = e.target.files[0]
    if (this.props.storage) {
      this.props.storage.put(file.name, file, {
        contentType: 'application/pdf'
      })
        .then (this.props.callback)
        .catch(err => console.log(err));
    } else {
      console.log('no storage driver found')
    }

  }

  render() {
    return (
      <input
        type="file" accept='application/pdf'
        onChange={(e) => this.onChange(e)}
      />
    )
  }
}

export default S3ImageUpload
