import { Component } from 'react'
import Modal from 'react-modal'
import ContentForm from '../ContentForm'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
}

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#__next')

class ModalWithHandlers extends Component {
  state = {
    modalIsOpen: false,
    handlers: {
      create: () => {},
      update: () => {},
      del: () => {}
    }
  }

  constructor(props) {
    super(props)
    this.state.handlers = props.handlers

    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    if (this.state.modalIsOpen) return;
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div className="adminControlledRegion" onClick={this.openModal}>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Edit Region Contents"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}></h2>
          <button onClick={this.closeModal}>X</button>
          <ContentForm
            table={this.props.table}
            data={[this.props.data]}
            handleCreate={this.state.handlers.create}
            handleDelete={this.state.handlers.del}
            handleUpdate={this.state.handlers.update}
          />
        </Modal>
        {this.props.children}
      </div>
    );
  }
}

export default ModalWithHandlers