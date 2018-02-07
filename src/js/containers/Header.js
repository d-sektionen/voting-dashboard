import React from 'react'
import { connect } from 'react-redux'
import { deleteToken, getUsername } from 'state'
import { loginURL } from 'config'
import { capitalize } from 'utils'
import SectionSelection from 'containers/SectionSelection'

class Header extends React.Component {
  componentDidMount() {
    this.props.getUsername()
  }

  render() {
    return (
      <nav className={this.props.className}>
        <div className='nav-wrapper'>
          <div className='left' style={{ height: '100%' }}>
            <SectionSelection />
          </div>
          <a href='/dashboard' className='brand-logo center hide-on-med-and-down'>{this.props.title}</a>
          <ul className='right'>
            { this.props.token ?
              <React.Fragment>
                <li className='hide-on-small-only' style={{ marginRight: '9px' }}>
                  {capitalize(this.props.username)}
                </li>
                <li>
                  <button onClick={this.props.onLogOut} className='waves-effect waves-light btn red darken-1'>Logga ut</button>
                </li>
              </React.Fragment>
          :
              <li><a href={loginURL} className='waves-effect waves-light btn green'>Logga in</a></li>
        }
          </ul>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  token: state.token,
  username: state.username,
})

const mapDispatchToProps = dispatch => ({
  onLogOut: () => dispatch(deleteToken()),
  getUsername: () => dispatch(getUsername()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header)
