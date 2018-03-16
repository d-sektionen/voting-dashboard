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

  handleNewAttendant(liuID) {
    addAttendant(liuID, this.props.currentMeetingID)
    return true
  }

  handleNewScanner(liuID) {
    addScanner(liuID, this.props.currentMeetingID)
    return true
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
        {
        this.props.currentMeetingID ?
          <React.Fragment>
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
                <li
                  key={`user${userObj.user.id}`}
                  className='collection-item user-item'
                >
                  {userObj.user.first_name !== '' ?
                    `${userObj.user.first_name} ${userObj.user.last_name} (${userObj.user.username})`
                    :
                    userObj.user.username
                  }
                  <i className='material-icons right' style={{ marginLeft: 0 }}>
                    {
                    userObj.scannerID ?
                      <a
                        onClick={() => this.handleRemoveScanner(userObj.scannerID)}
                        title='Ta bort som scanner'
                        style={{ color: 'green', cursor: 'pointer' }}
                      >
                        phone_android
                      </a>
                      :
                      <a
                        onClick={() => this.handleNewScanner(userObj.user.username)}
                        title='Lägg till som scanner'
                        style={{ color: 'grey', cursor: 'pointer' }}
                      >phone_android
                      </a>
                    }
                    <span style={{ marginRight: '6px' }} />
                    {
                    userObj.attendantID ?
                      <a
                        onClick={() => this.handleRemoveAttendant(userObj.attendantID)}
                        title='Ta bort som deltagare'
                        style={{ color: '#E53935', cursor: 'pointer' }}
                      >
                      clear
                      </a>
                      :
                      <a
                        onClick={() => this.handleNewAttendant(userObj.user.username)}
                        title='Lägg till som deltagare'
                        style={{ color: 'grey', cursor: 'pointer' }}
                      >
                      add
                      </a>
                    }
                  </i>
                </li>
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
  getScanners: meeting => dispatch(getScanners(meeting)),
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users)
