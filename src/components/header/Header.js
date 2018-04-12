import React from 'react'
import { connect } from 'react-redux'
import { deleteToken, getUserInfo } from 'state'
import { loginURL } from 'config'
import SectionSelection from 'containers/SectionSelection'

class Header extends React.Component {
  componentDidMount () {
    if (this.props.token) {
      // Get username, first/last name and what section the user belong to
      this.props.getUserInfo()
    }
  }

  componentWillReceiveProps (nextProps) {
    // We just got a token
    if (!this.props.token && nextProps.token) {
      this.props.getUserInfo()
    }
  }

  render () {
    return (
      <nav className={this.props.className}>
        <div className='nav-wrapper'>
          <div className='left' style={{ height: '100%' }}>
            <SectionSelection />
          </div>
          <a href='/dashboard' className='brand-logo center hide-on-med-and-down'>{this.props.title}</a>
          <ul className='right'>
            { this.props.token
              ? <React.Fragment>
                {this.props.userName &&
                  <li className='hide-on-small-only' style={{ marginRight: '9px' }}>
                    {`${this.props.firstName} ${this.props.lastName} (${this.props.userName})`}
                  </li>
                }
                <li>
                  <button onClick={this.props.logOut} className='waves-effect waves-light btn red darken-1'>Logga ut</button>
                </li>
              </React.Fragment>
              :              <li><a href={loginURL} className='waves-effect waves-light btn green'>Logga in</a></li>
            }
          </ul>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  token: state.token,
  userName: state.userInfo.userName,
  firstName: state.userInfo.firstName,
  lastName: state.userInfo.lastName
})

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(deleteToken()),
  getUserInfo: () => dispatch(getUserInfo())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
