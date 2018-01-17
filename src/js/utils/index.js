export const get = (key, defaultValue) => (
  localStorage.getItem(key) !== null ? JSON.parse(localStorage.getItem(key)) : defaultValue
)

export const store = (key, value) => localStorage.setItem(key, JSON.stringify(value))

export const removed = key => localStorage.removeItem(key)
