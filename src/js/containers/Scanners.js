import React from 'react'
import { connect } from 'react-redux'
import { addScanner, removeScanner } from 'api'
import { getScanners } from 'state'
import ListContainer from 'components/ListContainer'
import UserItem from 'components/UserItem'
import TextSubmit from 'components/TextSubmit'
import { liuIDSort } from 'utils'

class Scanners extends React.Component {
  constructor(props) {
    super(props)

    this.handleNewScanner = this.handleNewScanner.bind(this)
  }

  handleNewScanner(liuID) {
    addScanner(liuID, this.props.currentMeetingID)
    return true
  }

  handleRemoveScanner(scannerID) {
    removeScanner(scannerID, this.props.currentMeetingID)
  }

  render() {
    return (
      <ListContainer noItemText=''>
        {
        this.props.currentMeetingID ?
          <React.Fragment>
            <TextSubmit
              text='Nytt LiU-ID för scanner'
              pattern='^([A-Za-z]){4,5}([0-9]){3}$'
              onSubmit={this.handleNewScanner}
            />
            {
            this.props.scanners.sort(liuIDSort).map(scanner => (
              <UserItem user={scanner} onRemove={this.handleRemoveScanner} />
            ))
            }
          </React.Fragment>
          :
          <p>Inget möte valt</p>
        }
      </ListContainer>
    )
  }
}


const mapStateToProps = state => ({
  token: state.token,
  scanners: state.scanners,
  currentMeetingID: state.meetings.current,
})

const mapDispatchToProps = dispatch => ({
  getScanners: meeting => dispatch(getScanners(meeting)),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scanners)
