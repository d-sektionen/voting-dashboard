import { sections } from 'config'

// JSON-parsing for fetch
export const json = x => x.json()

// Retrieve, store and delete stuff in the local storage
export const get = (key, defaultValue) => (
  localStorage.getItem(key) !== null ? JSON.parse(localStorage.getItem(key)) : defaultValue
)

export const store = (key, value) => localStorage.setItem(key, JSON.stringify(value))

export const remove = key => localStorage.removeItem(key)

// Get the token from the URL
export const queryString = key => {
  const [foundKey, value] = window.location.search.substring(1).split('=')
  return foundKey === key ? value : null
}

export const randomID = () => `id${Math.random().toString(36).substr(5)}${Date.now().toString().substr(9)}`

export const capitalize = str => str[0].toUpperCase() + str.slice(1)

export const getSectionName = id => sections.find(section => section.id === id).name
