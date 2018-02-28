import React from 'react'
import { connect } from 'react-redux'
import { getUsers, addUser, removeUser, getScanners, addSacnner, removeScanner } from 'state'
import ListContainer from 'components/ListContainer'
import Panel from 'components/Panel'

const usersFilter = (childItem, textFilter) => {
  const test = childItem.props.children.toLowerCase()
  const filter = textFilter.trim().toLowerCase()
  return test.includes(filter)
}

class Users extends React.Component {
  componentDidMount() {
    // this.props.getUsers(this.props.currentMeeting)
  }

  render() {
    console.log(this.props)
    return (
      <React.Fragment>
        <Panel
          title='Registrerade'
          newItemText='Nytt LiU-ID'
          onAddItem={liuID => this.props.addUser(liuID, this.props.currentMeeting)}
        >
          <ListContainer
            filter={usersFilter}
            noItemsText='Inga personer hittades'
          >
            {this.props.attendants.map(user => (
              <a
                // onClick={() => this.props.handleSelectMeetings(meeting.id)}
                key={user.id}
                className={`collection-item ${user.id === 69 ? 'active' : ''}`}
                role='button'
                style={{ cursor: 'pointer' }}
              >
                {user.user.username}
                <i className='material-icons right'>phone_android</i>
              </a>
        ))}
          </ListContainer>
        </Panel>
        <Panel
          title='Scanner'
          newItemText='Ny scanner'
          onAddItem={liuID => this.props.addUser(liuID, this.props.currentMeeting)}
        >
          <ListContainer
            noItemsText='Inga scanner hittades'
          >
            {this.props.attendants.map(scanner => (
              JSON.stringify(scanner)
            // <a
              //   // onClick={() => this.props.handleSelectMeetings(meeting.id)}
              //   key={user.id}
              //   className={`collection-item ${user.id === 69 ? 'active' : ''}`}
              //   role='button'
              //   style={{ cursor: 'pointer' }}
              // >
              //   {user.user.username}
              //   <i className='material-icons right'>phone_android</i>
              // </a>
            ))}
          </ListContainer>
        </Panel>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  attendants: state.attendants,
  scanners: state.scanners,
  currentMeeting: state.meetings.current,
})

const mapDispatchToProps = dispatch => ({
  addUser: (liuID, meeting) => dispatch(addUser(liuID, meeting)),
  removeUser: (liuID, meeting) => dispatch(removeUser(liuID, meeting)),
  getUsers: meeting => dispatch(getUsers(meeting)),
  addScanner: (liuID, meeting) => 1,
  removeScanner: (liuID, meeting) => 1,
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users)
