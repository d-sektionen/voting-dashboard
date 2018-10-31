import React from 'react'
import { logOut, connect } from '../common'

function Header (props) {
  return (
    <nav id='header'>
      <a id='header-title' href='./'>Dashboard för D-CIDE</a>
      <div>
        {
          props.token &&
          <React.Fragment>
            {
              props.userName &&
              <span>{`${props.firstName} ${props.lastName} (${props.userName})`}</span>
            }
            <button onClick={() => logOut()}>Logga ut</button>
          </React.Fragment>
        }
      </div>
    </nav>
  )
}

export default connect(Header)
