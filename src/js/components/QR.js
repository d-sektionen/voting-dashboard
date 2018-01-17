import React from 'react'
import Image from 'react-bootstrap/lib/Image'

import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import Modal from 'react-bootstrap/lib/Modal'


export default class QR extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showFullscreen: false,
    }
  }

  handleClick() {
    this.setState({
      showFullscreen: true,
    })
  }

  render() {
    const qr_src = `${this.props.baseUrl}qr?session_id=${this.props.session_id}&admin_token=${this.props.admin_token}`

    return (
      <div>

        <Modal
          show={this.state.showFullscreen}
          onHide={() => this.setState({ showFullscreen: false })}
          dialogClassName='qr-img-modal'
        >
          <Modal.Body>
            <Image
              src={qr_src}
              responsive
              rounded
            />
          </Modal.Body>
        </Modal>

        <Image
          src={qr_src}
          responsive
          rounded
          id='qr-img'
        />
        <a href='#'>
          <Glyphicon
            glyph='fullscreen'
            id='qr-fullscreen'
            onClick={this.handleClick.bind(this)}
          />
        </a>
      </div>
    )
  }
}
