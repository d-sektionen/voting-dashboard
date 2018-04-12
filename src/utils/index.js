import {Subscribe} from 'unstated'

// Retrieve, store and delete stuff in the local storage
export const get = (key, defaultValue = undefined) => {
  const item = localStorage.getItem(key)
  return item !== null ? JSON.parse(item) : defaultValue
}

export const set = (key, value) => localStorage.setItem(key, JSON.stringify(value))

export const remove = key => localStorage.removeItem(key)

// Generates random IDs, used for the textField component
export const randomID = () => `id${Math.random().toString(36).substr(5)}${Date.now().toString().substr(9)}`

export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

// Sort a list by LiU-ID
export const liuIDSort = (a, b) => a.user.username.localeCompare(b.user.username)

export const deleteToken = () => {
  remove('token')
  window.location.reload()
}

export const connect = container => {
  return Component => {
    return props => {
      return (
        <Subscribe to={container}>
          {(...containerObject) => {
            return (
              <Component {...props} {...containerObject} {...containerObject.state} />
            )
          }}
        </Subscribe>
      )
    }
  }
}
