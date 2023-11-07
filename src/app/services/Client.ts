import axios from "axios";
import { accessTokenKey } from "../config/constants/localStorageKeys";
import { useUserStore } from "../store/useUserProvider";
import { toast } from "../utils/toast";
const { VITE_API_URL } = import.meta.env


export const httpClient = axios.create({
  baseURL: VITE_API_URL,
})

httpClient.interceptors.request.use(config => {
  const token = localStorage.getItem(accessTokenKey)
  token && config.headers.set('Authorization', `Bearer ${token}`)
  return config
})

httpClient.interceptors.response.use(response => response, error => {
  const userStore = useUserStore();
  const response = error.response.status;
  if (response === 401) {
    userStore.signout()
    toast.error('Sua sessão expirou')
  }
})