import { ref } from 'vue'
import { useAccountStore } from '@/app/store/useAccountStore'
import { storeToRefs } from 'pinia'


export function useFiltersModalController() {
  const store = useAccountStore()
  const { data: accounts } = storeToRefs(store)

  const selectedAccountId = ref<undefined | string>(undefined)

  const handleSelectedId = (id: string): void => {
    const prevId = selectedAccountId.value
    prevId === id ? (selectedAccountId.value = undefined) : (selectedAccountId.value = id)
  }

  const selectedYear = ref<number>(new Date().getFullYear())

  const handleSelectedYear = (step: number): void => {
    selectedYear.value += step
  }

  return {
    accounts,
    selectedAccountId,
    selectedYear,
    handleSelectedId,
    handleSelectedYear,
  }
}