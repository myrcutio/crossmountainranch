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
    editModalIsOpen: false,
    createModalIsOpen: false
  }

  openEditModal = () => {
    if (this.state.editModalIsOpen) return;
    this.setState({editModalIsOpen: true});
  }

  openCreateModal = () => {
    if (this.state.createModalIsOpen) return;
    this.setState({createModalIsOpen: true});
  }

  closeEditModal = () => {
    this.setState({editModalIsOpen: false});
  }

  closeCreateModal = () => {
    this.setState({createModalIsOpen: false});
  }

  render() {
    return (
      <div className="adminControlledRegion">
        <Modal
          isOpen={this.state.editModalIsOpen}
          onRequestClose={this.closeEditModal}
          style={customStyles}
          contentLabel="Edit Region Contents"
        >
          <h2 ref={subtitle => this.subtitle = subtitle}></h2>
          <button onClick={this.closeEditModal}>X</button>
          <ContentForm
            {...this.props}

            callback={this.closeEditModal}
          />
        </Modal>
        <Modal
          isOpen={this.state.createModalIsOpen}
          onRequestClose={this.closeCreateModal}
          style={customStyles}
          contentLabel="Add New Region"
        >
          <h2 ref={subtitle => this.subtitle = subtitle}></h2>
          <button onClick={this.closeCreateModal}>X</button>
          <ContentForm
            {...this.props}
            data={null}
            table={this.props.table === 'pages' ? 'pages' : null}
            callback={this.closeCreateModal}
          />
        </Modal>
        <div className="editOverlay" onClick={this.openEditModal}>
          {this.props.children}
        </div>
        <div className="createOverlay" onClick={this.openCreateModal}>
          +
        </div>
      </div>
    );
  }
}

export default ModalWithHandlers