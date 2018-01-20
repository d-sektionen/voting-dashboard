import React from 'react'
import { connect } from 'react-redux'
import { deleteToken } from 'state'
import { loginURL } from 'config'
import { capitalize } from 'utils'
import SectionSelection from 'containers/SectionSelection'

const Header = props => (
  <nav className={props.className}>
    <div className='nav-wrapper'>
      <div className='left' style={{ height: '100%' }}>
        <SectionSelection />
      </div>
      <a href='/' className='brand-logo center hide-on-med-and-down'>{props.title}</a>
      <ul className='right'>
        { props.token ?
          <React.Fragment>
            <li className='hide-on-small-only' style={{ marginRight: '9px' }}>
              {capitalize('jeswr740')}
            </li>
            <li>
              <button onClick={props.onLogOut} className='waves-effect waves-light btn red darken-1'>Logga ut</button>
            </li>
          </React.Fragment>
          :
          <li><a href={loginURL} className='waves-effect waves-light btn green'>Logga in</a></li>
        }
      </ul>
    </div>
  </nav>
)

const mapStateToProps = state => ({
  token: state.token,
})

const mapDispatchToProps = dispatch => ({
  onLogOut: () => dispatch(deleteToken()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header)
