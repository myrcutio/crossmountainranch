import { Component } from 'react'
import Spinner from '../../Spinner'

class S3ImageUpload extends Component {
  state = {
    isLoading: false
  }
  onChange(e) {
    this.setState({
      isLoading: true
    })
    const file = e.target.files[0]
    if (this.props.storage) {
      this.props.storage.put(file.name, file, {
        contentType: 'application/pdf'
      })
        .then ((e) => {
          this.setState({
            isLoading: false
          })
          this.props.callback(e)
        })
        .catch(err => console.log(err));
    } else {
      console.log('no storage driver found')
    }
  }

  render() {
    return (
      <div>
        { this.state.isLoading ? <Spinner name="line-scale"/> : null}
        <input
          type="file" accept='application/pdf'
          onChange={(e) => this.onChange(e)}
        />
      </div>
    )
  }
}

export default S3ImageUpload
