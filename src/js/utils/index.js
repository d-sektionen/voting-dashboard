// JSON-parsing for fetch
export const json = x => x.json()

// Retrieve, store and delete stuff in the local storage
export const get = (key, defaultValue) => (
  localStorage.getItem(key) !== null ? JSON.parse(localStorage.getItem(key)) : defaultValue
)

export const set = (key, value) => localStorage.setItem(key, JSON.stringify(value))

export const remove = key => localStorage.removeItem(key)

// Check if object has no properties
export const isEmpty = obj => Object.keys(obj).length === 0 && obj.constructor === Object

// Generates random IDs, used for the textField component
export const randomID = () => `id${Math.random().toString(36).substr(5)}${Date.now().toString().substr(9)}`

export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

// sort by LiU-ID
export const liuIdSort = arr => arr.sort((a, b) => a.user.username.localeCompare(b.user.username))

export const getImagePath = section => `/dashboard/images/sections/${section}.png`
