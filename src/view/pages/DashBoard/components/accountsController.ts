import { computed, inject, ref } from "vue"
import type { balanceProviderProps } from "../providers/balanceProvider"
import { useQuery } from "@tanstack/vue-query"
import bankAccountsService from "@/app/services/BankAccountsService"

export function useAccountsController() {
  const { areVisible, toggleVisibility } = inject('balanceProvider') as balanceProviderProps
  const eyeOpen = ref<boolean>(false)

  const toggleEye = (): void => {
    eyeOpen.value = areVisible.value
    toggleVisibility()
  }

  const { data, isLoading } = useQuery({
    queryKey: ['bankAccounts'],
    queryFn: bankAccountsService.getAll
  })

  const total = computed(() => {
    return data.value?.reduce((total, account) => total + account.currentBalance, 0) ?? 0
  })


  return {
    accounts: data,
    total,
    isLoading,
    eyeOpen,
    toggleEye
  }
}