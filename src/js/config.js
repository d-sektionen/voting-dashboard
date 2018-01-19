const isProd = process.env.NODE_ENV === 'production'

export const apiURL = isProd ? 'http://api.d-sektionen.se' : 'http://localhost:8000'
export const loginURL = `${apiURL}/account/token?redirect=${window.location.href}`

const imagePath = section => `/dashboard/images/sections/${section}.png`

export const sections = [
  {
    name: 'd',
    id: 1,
    logo: imagePath('d'),
  },
  {
    name: 'i',
    id: 2,
    logo: imagePath('i'),
  },
  {
    name: 'm',
    id: 3,
    logo: imagePath('m'),
  },
  {
    name: 'y',
    id: 4,
    logo: imagePath('y'),
  },
]
