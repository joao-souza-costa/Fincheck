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

export const FORGOT_PASSWORD: iRoute = {
  path: 'forgot-password',
  name: 'FORGOT_PASSWORD'
}

export const FORGOT_CHANGE_PASSWORD: iRoute = {
  path: 'forgot-password/:token',
  name: 'FORGOT_CHANGE_PASSWORD'
}

export const DASHBOARD: iRoute = {
  path: '/dash-board',
  name: 'DASHBOARD'
}

