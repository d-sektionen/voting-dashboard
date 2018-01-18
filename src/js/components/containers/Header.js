import React from 'react'

export default class Header extends React.Component {
  render() {
    let button
    // props.liuID
    if (props.loggedIn) {
      button = <button onClick={props.onLogOut} className='waves-effect waves-light btn'>Logga ut</button>
    } else {
      button = <a href='http://localhost:8000/account/token?redirect=http://localhost:8080' className='waves-effect waves-light btn'>Logga in</a>
    }

    return (
      <nav>
        <div className='nav-wrapper'>
          <a href='/' className='brand-logo center'>{props.title}</a>
          <ul className='right'>
            <li>{props.liuID && props.liuID.toUpperCase()} - </li>
            <li>
              {button}
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}
