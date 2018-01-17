import React from 'react'

export default props => {
  let button

  if (props.liuID) {
    button = <button className='waves-effect waves-light btn'>Logga ut</button>
  } else {
    button = <button className='waves-effect waves-light btn'>Logga in</button>
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
