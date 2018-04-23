
const isDev = process.env.NODE_ENV === 'development'

export const apiURL = isDev ? 'https://dsek-api-dev.herokuapp.com' : 'https://api.d-sektionen.se'
export const socketURL = isDev ? 'wss://dsek-api-dev.herokuapp.com' : 'wss://api.d-sektionen.se'
export const loginURL = `${apiURL}/account/token?redirect=${window.location.href}`
