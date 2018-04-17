export const apiURL = 'https://dsek-api-dev.herokuapp.com'
export const socketURL = 'wss://dsek-api-dev.herokuapp.com'

// const isProd = process.env.NODE_ENV === 'production'
// export const apiURL = isProd ? 'https://dsek-api-dev.herokuapp.com' : 'http://localhost:8000'
// export const apiURL = isProd ? 'http://api.d-sektionen.se' : 'http://localhost:8000'
// export const socketURL = isProd ? 'wss://dsek-api-dev.herokuapp.com' : 'ws://localhost:8000'

export const loginURL = `${apiURL}/account/token?redirect=${window.location.href}`
