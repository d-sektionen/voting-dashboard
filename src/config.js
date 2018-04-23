const isProd = process.env.NODE_ENV === 'production'
export const apiURL = isProd ? 'https://api.d-sektionen.se' : 'https://dsek-api-dev.herokuapp.com'
export const socketURL = isProd ? 'wss://api.d-sektionen.se' : 'wss://dsek-api-dev.herokuapp.com'
export const loginURL = `${apiURL}/account/token?redirect=${window.location.href}`
