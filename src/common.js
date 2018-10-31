import React from 'react'
import { Subscribe } from 'unstated'
import StateContainer from 'state'
import queryString from 'query-string'

// Retrieve, store and delete stuff in the local storage
export const get = (key, defaultValue = undefined) => {
  const item = localStorage.getItem(key)
  return item !== null ? JSON.parse(item) : defaultValue
}

export const set = (key, value) => localStorage.setItem(key, JSON.stringify(value))

export const remove = key => localStorage.removeItem(key)

// Sort a list by LiU-ID
export const liuIDSort = (a, b) => a.user.username.localeCompare(b.user.username)

export const idSort = (a, b) => {
  if (a.id < b.id) {
    return 1
  } else if (a.id > b.id) {
    return -1
  }

  return 0
}

export const alternativeSort = (a, b) => {
  if (a.num_votes < b.num_votes) {
    return 1
  } else if (a.num_votes > b.num_votes) {
    return -1
  }

  return 0
}

export const logOut = () => {
  remove('token')
  window.location.reload()
}

export const getToken = () => {
  let { token } = queryString.parse(window.location.search)

  if (token !== undefined) {
    window.history.replaceState(null, null, window.location.pathname)
  } else {
    token = get('token')
  }

  if (token !== undefined) {
    set('token', token)
  }
  return token
}

export const connect = Component => props => (
  <Subscribe to={[StateContainer]}>
    {container => (
      <Component {...props} {...container} {...container.state} />
    )}
  </Subscribe>
)
