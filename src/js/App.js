import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { getSectionName } from 'utils'

// Containers
import Header from 'containers/Header'
import Meetings from 'containers/Meetings'
import Votes from 'containers/Votes'
import Users from 'containers/Users'

const app = props => (
  <React.Fragment>
    <Header
      title='Dashboard för D-Cide'
      className='grey darken-4'
    />
    <div className={classNames('row', 'section', getSectionName(props.section))}>
      <div className='col s12 m3'>
        <Meetings />
      </div>
      <div className='col s12 m5 l6'>
        <Votes />
      </div>
      <div className='col s12 m4 l3'>
        <Users />
      </div>
    </div>
  </React.Fragment>
)

const mapStateToProps = state => ({
  section: state.section,
})

export default connect(mapStateToProps)(app)
