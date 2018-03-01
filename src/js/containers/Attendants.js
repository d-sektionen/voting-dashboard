import React from 'react'
import { connect } from 'react-redux'
import { getAttendants, getScanners } from 'state'
import { addAttendant, addScanner } from 'api'
import ListContainer from 'components/ListContainer'
import Panel from 'components/Panel'
import TextSubmit from 'components/TextSubmit'
import M from 'materialize-css'
import { removeAttendant } from '../api/attendants'
import { removeScanner } from '../api/scanners'

class Users extends React.Component {
  constructor(props) {
    super(props)

    this.handleNewAttendant = this.handleNewAttendant.bind(this)
    this.handleNewScanner = this.handleNewScanner.bind(this)
    this.handleRemoveAttendant = this.handleRemoveAttendant.bind(this)
    this.handleRemoveScanner = this.handleRemoveScanner.bind(this)
  }

  componentDidMount() {
    const meetingID = this.props.currentMeetingID

    if (this.props.token && meetingID) {
      this.props.getAttendants(meetingID)
      this.props.getScanners(meetingID)
    }
  }

  componentWillReceiveProps(nextProps) {
    const oldMeetingID = this.props.currentMeetingID
    const newMeetingID = nextProps.currentMeetingID

    if (nextProps.token && newMeetingID && newMeetingID !== oldMeetingID) {
      this.props.getAttendants(newMeetingID)
      this.props.getScanners(newMeetingID)
    }
  }

  handleNewAttendant(liuID) {
    if (this.props.currentMeetingID) {
      addAttendant(liuID.toLowerCase(), this.props.currentMeetingID)
      return true
    }

    M.toast({ html: 'Inget möte valt!' })
    return false
  }

  handleNewScanner(liuID) {
    if (this.props.currentMeetingID) {
      addScanner(liuID.toLowerCase(), this.props.currentMeetingID)
      return true
    }

    M.toast({ html: 'Inget möte valt!' })
    return false
  }

  handleRemoveAttendant(attendantID) {
    removeAttendant(attendantID, this.props.currentMeetingID)
  }

  handleRemoveScanner(scannerID) {
    removeScanner(scannerID, this.props.currentMeetingID)
  }

  render() {
    const allUsers = []

    this.props.attendants.forEach(attendant => {
      const userObject = {
        attendantID: attendant.id,
        user: attendant.user,
      }

      allUsers.push(userObject)
    })

    this.props.scanners.forEach(scanner => {
      const userID = scanner.user.id
      let userObj = allUsers.find(user => user.user.id === userID)

      if (!userObj) {
        userObj = {
          user: scanner.user,
        }
        allUsers.push(userObj)
      }

      userObj.scannerID = scanner.id
    })

    return (
      <Panel title='Personer'>
        <TextSubmit
          text='Nytt LiU-ID för deltagare'
          pattern='^([A-Za-z]){4,5}([0-9]){3}$'
          onSubmit={this.handleNewAttendant}
        />
        <TextSubmit
          text='Nytt LiU-ID för scanner'
          pattern='^([A-Za-z]){4,5}([0-9]){3}$'
          onSubmit={this.handleNewScanner}
        />
        <ListContainer noItemsText='Inga personer hittades'>
          {allUsers.map(userObj => (
            <div
              key={`user${userObj.user.id}`}
              className='collection-item user-item'
            >
              {userObj.user.first_name !== '' ?
                `${userObj.user.first_name} ${userObj.user.last_name} (${userObj.user.username})`
                :
                userObj.user.username
              }
              <i className='material-icons right' style={{ marginLeft: 0 }}>
                {userObj.scannerID ?
                  <a
                    onClick={() => this.handleRemoveScanner(userObj.scannerID)}
                    title='Ta bort som scanner'
                    style={{ color: 'green', cursor: 'pointer' }}
                    role='button'
                  >phone_android
                  </a>
                  :
                  <a
                    onClick={() => this.handleNewScanner(userObj.user.username)}
                    title='Lägg till som scanner'
                    style={{ color: 'grey', cursor: 'pointer' }}
                    role='button'
                  >phone_android
                  </a>
                }
                <span style={{ marginRight: '6px' }} />
                {userObj.attendantID ?
                  <a
                    onClick={() => this.handleRemoveAttendant(userObj.attendantID)}
                    title='Ta bort som deltagare'
                    style={{ color: '#E53935', cursor: 'pointer' }}
                    role='button'
                  >clear
                  </a>
                  :
                  <a
                    onClick={() => this.handleNewAttendant(userObj.user.username)}
                    title='Lägg till som deltagare'
                    style={{ color: 'grey', cursor: 'pointer' }}
                    role='button'
                  >add
                  </a>
                }
              </i>
            </div>
          ))}
        </ListContainer>
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
  getScanners: meeting => dispatch(getScanners(meeting)),
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users)
