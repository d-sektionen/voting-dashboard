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
    this.props.getUsers(this.props.currentMeeting)
  }

  render() {
    return (
      <Panel
        title='Registrerade'
        newItemText='Nytt LiU-ID'
        onAddItem={liuID => this.props.addUser(liuID, this.props.currentMeeting)}
      >
        <ListContainer
          filter={usersFilter}
          noItemsText='Inga personer hittades'
        >
          {this.props.user.map(user => (
            <a
            // onClick={() => this.props.handleSelectMeetings(meeting.id)}
              key={user.id}
              className={`collection-item ${user.id === 69 ? 'active' : ''}`}
              role='button'
              style={{ cursor: 'pointer' }}
            >
              {user.user.username}
            </a>
        ))}
        </ListContainer>
      </Panel>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  scanners: state.scanners,
  currentMeeting: state.meeting.current,
})

const mapDispatchToProps = dispatch => ({
  addUser: (liuID, meeting) => dispatch(addUser(liuID, meeting)),
  removeUser: (liuID, meeting) => dispatch(removeUser(liuID, meeting)),
  getUsers: meeting => dispatch(getUsers(meeting)),
  addScanner: () => 1,
  removeScanner: () => 1,
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users)
