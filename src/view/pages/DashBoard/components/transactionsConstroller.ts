import { ref } from "vue"

export function useTransactionsController() {

  const isOpenFiltersModal = ref(false)

  const closeFiltersModal = (): boolean => {
    return isOpenFiltersModal.value = false
  }
  const openFiltersModal = (): boolean => {
    return isOpenFiltersModal.value = true
  }

  return {
    transactions: [],
    transactionsLoading: false,
    initialLoading: false,
    isOpenFiltersModal,
    closeFiltersModal,
    openFiltersModal
  }
}