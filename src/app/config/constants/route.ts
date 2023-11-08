interface iRoute {
  path: string,
  name: string
}

export const HOME: iRoute = {
  path: '/',
  name: 'HOME'
}

export const LOGIN: iRoute = {
  path: '',
  name: 'LOGIN'
}

export const REGISTER: iRoute = {
  path: 'register',
  name: 'REGISTER'
}

export const DASHBOARD: iRoute = {
  path: '/dash-board',
  name: 'DASHBOARD'
}

