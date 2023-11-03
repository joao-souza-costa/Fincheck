import { httpClient } from "./Client";

export interface signUpParams {
  email: string,
  name: string,
  password: string
}

export interface signInParams {
  email: string,
  password: string
}


export default {
  signUp: async (params: signUpParams) => {
    const { data } = await httpClient.post<{ token: string }>('/auth/signup', params)
    return data
  },

  signIn: async (params: signInParams) => {
    const { data } = await httpClient.post<{ token: string }>('/auth/signin', params)
    return data
  },
}