import { computed, inject, ref } from "vue"
import type { balanceProviderProps } from "../providers/balanceProvider"
import { useAccountStore } from "@/app/store/useAccountStore"
import { storeToRefs } from "pinia"

export function useAccountsController() {
  const { areVisible, toggleVisibility } = inject('balanceProvider') as balanceProviderProps
  const { data: accounts, queryLoading: isLoading, totalExpense, totalIncome } = storeToRefs(useAccountStore())
  const eyeOpen = ref<boolean>(false)

  const toggleEye = (): void => {
    eyeOpen.value = areVisible.value
    toggleVisibility()
  }

  const total = computed(() => {
    return totalExpense.value + totalIncome.value
  })

  return {
    accounts,
    isLoading,
    total,
    eyeOpen,
    toggleEye
  }
}