import React from 'react'
import TextInput from 'components/TextInput'

export default props => (
  <div className='card-panel panel'>
    <div>
      {props.title &&
        <React.Fragment>
          <h4 className='center panel-header'>{props.title}</h4>
          <div className='divider' />
        </React.Fragment>
      }
      {props.children}
    </div>
  </div>
)
