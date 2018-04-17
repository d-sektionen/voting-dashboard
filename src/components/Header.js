import React from 'react'
import { logOut, connect } from 'utils'
import { loginURL } from 'config'

const Header = props => (
  <nav className='grey darken-4'>
    <div className='nav-wrapper'>
      <div className='left'>
        <select onChange={event => props.setCurrentSection(event.target.value)} className='browser-default grey darken-4' >
          {props.sections.map(section => (
            <option key={`section${section.id}`} value={section.id} className='grey darken-4'>{section.name}</option>
          ))}
        </select>
      </div>
      <a href='./' className='brand-logo center hide-on-med-and-down'>D-Cide - Dashboard</a>
      <div className='right'>
        {
          props.token
            ? <React.Fragment>
              {props.userName &&
                `${props.firstName} ${props.lastName} (${props.userName})`
              }
              <button onClick={() => logOut()} className='waves-effect waves-light btn red darken-1 login-button'>Logga ut</button>
            </React.Fragment>
            : <a href={loginURL} className='waves-effect waves-light btn green login-button'>Logga in</a>
        }
      </div>
    </div>
  </nav>
)

export default connect(Header)
