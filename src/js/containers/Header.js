import React from 'react'
import { connect } from 'react-redux'
import { logout } from 'state'
import { loginURL } from 'config'
import SectionSelection from 'containers/SectionSelection'

const Header = props => (
  <nav className={props.className}>
    <div className='nav-wrapper'>
      <div className='left' style={{ height: '100%' }}>
        <SectionSelection />
      </div>
      <a href='/' className='brand-logo center hide-on-med-and-down'>{props.title}</a>
      <ul className='right'>
        <li>JESWR740 - </li>
        <li>
          { props.token ?
            <button onClick={props.onLogOut} className='waves-effect waves-light btn'>Logga ut</button>
            :
            <a href={loginURL} className='waves-effect waves-light btn'>Logga in</a>
          }
        </li>
      </ul>
    </div>
  </nav>
)

const mapStateToProps = (state, ownProps) => ({
  token: state.login,
})

const mapDispatchToProps = dispatch => ({
  onLogOut: () => dispatch(logout()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header)
