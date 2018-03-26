import React from 'react'
import { connect } from 'react-redux'
import { getAttendants } from 'state'
import { addAttendant, removeAttendant } from 'api'
import ListContainer from 'components/ListContainer'
import Panel from 'components/Panel'
import TextSubmit from 'components/TextSubmit'
import UserItem from 'components/UserItem'
import { liuIDSort } from 'utils'

class Users extends React.Component {
  constructor(props) {
    super(props)

    this.handleNewAttendant = this.handleNewAttendant.bind(this)
    this.handleRemoveAttendant = this.handleRemoveAttendant.bind(this)
  }

  handleNewAttendant(liuID) {
    addAttendant(liuID, this.props.currentMeetingID)
    return true
  }

  handleRemoveAttendant(attendantID) {
    removeAttendant(attendantID, this.props.currentMeetingID)
  }

  render() {
    return (
      <Panel title='Personer'>
        {
        this.props.currentMeetingID ?
          <React.Fragment>
            <TextSubmit
              text='Nytt LiU-ID för deltagare'
              pattern='^([A-Za-z]){4,5}([0-9]){3}$'
              onSubmit={this.handleNewAttendant}
            />
            <ListContainer noItemsText='Inga personer hittades'>
              {this.props.attendants.sort(liuIDSort).map(attendant => (
                <UserItem user={attendant} removeString='Ta bort som deltagare' />
              ))}
            </ListContainer>
          </React.Fragment>
         :
          <p>Inget möte valt</p>
    }
      </Panel>
    )
  }
}

const mapStateToProps = state => ({
  token: state.token,
  attendants: state.attendants,
  scanners: state.scanners,
  currentMeetingID: state.meetings.current,
})

const mapDispatchToProps = dispatch => ({
  getAttendants: meeting => dispatch(getAttendants(meeting)),

})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users)
