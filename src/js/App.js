import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { loginURL } from 'config'
// Containers
import Header from 'containers/Header'
import Meetings from 'containers/Meetings'
import Votes from 'containers/Votes'
import Attendants from 'containers/Attendants'

const app = props => (
  <React.Fragment>
    <Header
      title='Dashboard för D-Cide'
      className='grey darken-4'
    />
    {props.token ?
      // Logged in, show meetings, votes and user
      <div className={classNames('row', 'section', props.currentSectionName)}>
        <div className='col s12 m3'>
          <Meetings />
        </div>
        <div className='col s12 m5 l6'>
          {/* <Votes /> */}
        </div>
        <div className='col s12 m4 l3'>
          {/* <Attendants /> */}
        </div>
      </div>
    :
      // Logged out, show login text
      <div>
        <h5 className='center-align'>
          <a href={loginURL}>Logga in </a>
           för använda D-Cides Dashboard
        </h5>
      </div>
    }
  </React.Fragment>
)

const mapStateToProps = state => ({
  currentSectionName: state.sections.current.name,
  token: state.token,
})

export default connect(mapStateToProps)(app)
