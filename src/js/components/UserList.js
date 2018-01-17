import React from 'react'
import FlipMove from 'react-flip-move'

import Button from 'react-bootstrap/lib/Button'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'


class User extends React.Component {
  constructor(props) {
    super(props)

    this.savedSession = this.props.session_id

    this.state = {
      isHovering: false,
    }
  }

  render() {
    const button = (
      <Button
        bsStyle='danger'
        className='raised users-item-button'
        onClick={() => this.props.onRemove(this.props.user[0])}
      >
        <Glyphicon glyph='remove' />
      </Button>
    )

    // voted ? "vote" : "novote"
    return (
      <li
        className='users-item noshow'
        onMouseEnter={() => this.setState({ isHovering: true })}
        onMouseLeave={() => this.setState({ isHovering: false })}
      >
        <text className='users-item-text'>{this.props.user[0]}</text>
        {this.state.isHovering ? button : null}
      </li>
    )
  }
}

export default class UserList extends React.Component {
  constructor(props) {
    super(props)

    this.intervalId = null
    this.savedSession = null

    this.state = {
      users: [],
    }
  }

  componentDidMount() {
    this.intervalId = setInterval(this.handleUpdate.bind(this), 3000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  handleUpdate() {
    const userPromise = this.props.onUpdate()

    userPromise.then(dataJSON => {
      if (!dataJSON) return // Nothing new, don't update.
      const users = dataJSON.data.users.map(user => [user.liu_id, user.timestamp, user.vote])
      this.updateList(users)
    })
  }

  handleRemove(user) {
    this.props.onRemove(user)
    this.handleUpdate()
  }

  updateList(users) {
    users.sort()

    const userList = users.map(user => (
      <User
        key={user[0]}
        user={user}
        onRemove={this.handleRemove.bind(this)}
      />
    ))

    this.setState({
      users: userList,
    })
  }

  render() {
    // How we know a new session was opened, ergo we need to open an eventSource at this
    if (this.props.session_id !== this.savedSession) {
      this.handleUpdate()
      this.savedSession = this.props.session_id
    }

    return (
      <ul>
        <FlipMove
          staggerDurationBy={100}
          duration={150}
          enterAnimation='fade'
          leaveAnimation='fade'
        >
          {this.state.users}
        </FlipMove>
      </ul>
    )
  }
}
