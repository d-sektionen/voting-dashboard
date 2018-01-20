import React from 'react'
import queryString from 'query-string'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { store, setToken } from 'state'
import { getSectionName } from 'utils'
import Header from 'containers/Header'
import Meetings from 'containers/Meetings'
import Voting from 'containers/Voting'
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
    const sectionName = getSectionName(this.props.section)

    return (
      <React.Fragment>
        <Header
          title='Dashboard för D-Cide'
          className='grey darken-4'
        />
        <div className={classNames('row', 'section', sectionName)}>
          <div className='col s12 m3'>
            <Meetings />
          </div>
          <div className='col s12 m5 l6'>
            <Voting />
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
