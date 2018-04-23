import React from 'react'
import { logOut, connect } from 'utils'

const Header = props => (
  <nav id='header'>
    <h3 id='header-title'>
      <a href='./'>Dashboard för D-CIDE</a>
    </h3>
    <div>
      {
        props.sections.length !== 0 &&
        <select onChange={event => props.setCurrentSection(event.target.value)}>
          {props.sections.map(section => (
            <option key={`section${section.id}`} value={section.id}>{section.name}</option>
          ))}
        </select>
      }
      {
        props.token &&
        <React.Fragment>
          {
            props.userName &&
            <span>{`${props.firstName} ${props.lastName} (${props.userName})`}</span>
          }
          <button title='Logga ut' className='button-primary' onClick={() => logOut()}>Logga ut</button>
        </React.Fragment>
      }
    </div>
  </nav>
)

export default connect(Header)
