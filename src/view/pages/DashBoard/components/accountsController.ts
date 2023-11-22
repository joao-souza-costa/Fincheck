import { inject, ref } from "vue"
import type { balanceProviderProps } from "../providers/balanceProvider"

export function useAccountsController() {
  const { areVisible, toggleVisibility } = inject('balanceProvider') as balanceProviderProps
  const eyeOpen = ref<boolean>(false)

  const toggleEye = (): void => {
    eyeOpen.value = areVisible.value
    toggleVisibility()
  }

  return {
    accounts: [],
    isLoading: false,
    eyeOpen,
    toggleEye
  }
}