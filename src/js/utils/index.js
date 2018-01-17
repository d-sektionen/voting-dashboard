
// JSON-parsing for fetch
export const json = x => x.json()

// Retrieve, store and delete stuff in the local storage
export const get = (key, defaultValue) => (
  localStorage.getItem(key) !== null ? JSON.parse(localStorage.getItem(key)) : defaultValue
)

export const store = (key, value) => localStorage.setItem(key, JSON.stringify(value))

export const remove = key => localStorage.removeItem(key)
