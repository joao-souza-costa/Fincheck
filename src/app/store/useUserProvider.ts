import { defineStore } from "pinia"
import { useRouter } from "vue-router"
import { ref, type InjectionKey } from "vue"
import { accessTokenKey } from "../config/constants/localStorageKeys"
import { DASHBOARD, LOGIN } from "@/router/const"
import { useQuery } from "@tanstack/vue-query"
import userService from "../services/UserService"

export const userProviderKey = Symbol() as InjectionKey<{
  getSignedIn: Function
  signin: Function
}>

export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  const accessToken = ref<boolean>(Boolean(localStorage.getItem(accessTokenKey)))

  const {isFetching, isSuccess, remove} = useQuery({
    queryKey: ['users', 'me'],
    queryFn: async () => userService.me(),
    enabled: accessToken,
    staleTime:Infinity
  })

  const signin = (token: string): void => {
    localStorage.setItem(accessTokenKey, token)
    accessToken.value = Boolean(token)
    router.push(DASHBOARD)
  }

  const signout = (): void => {
    localStorage.removeItem(accessTokenKey)
    accessToken.value = Boolean(false)
    remove()
    router.push(LOGIN)
  }

  return {
    accessToken,
    isFetching,
    isSuccess,
    signin,
    signout
  }
})