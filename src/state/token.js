import { get, set, remove } from 'utils'
import { Container } from 'unstated'
import queryString from 'query-string'

export default class TokenContainer extends Container {
  state = {
    token: undefined
  }

  getToken () {
    let { token } = queryString.parse(window.location.search)

    if (token !== undefined) {
      window.history.replaceState(null, null, window.location.pathname)
    } else {
      token = get('token')
    }

    set('token', token)
    this.setState({token})
  }

  deleteToken () {
    remove('token')
    window.location.reload()
  }
}
