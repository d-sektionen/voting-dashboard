import React from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'
import classNames from 'classnames'

// State
import { store, setToken } from 'state'
import { getSectionName } from 'utils'

// Containers
import Header from 'containers/Header'
import Meetings from 'containers/Meetings'
import Votes from 'containers/Votes'
import Users from 'containers/Users'

class App extends React.Component {
  constructor(props) {
    super(props)

    const { token } = queryString.parse(window.location.search)

    if (token) {
      store.dispatch(setToken(token))
      window.history.pushState(null, null, '/dashboard')
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header
          title='Dashboard för D-Cide'
          className='grey darken-4'
        />
        <div className={classNames('row', 'section', getSectionName(this.props.section))}>
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
  }
}

const mapStateToProps = state => ({
  section: state.section,
})

export default connect(mapStateToProps)(App)
