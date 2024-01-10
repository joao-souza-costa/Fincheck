import { useTransactionsStore } from "@/app/store/useTransactionStore"
import { storeToRefs } from "pinia"
import { ref } from "vue"

export function useTransactionsController() {

  const isOpenFiltersModal = ref(false)

  const store = useTransactionsStore()
  const { data, queryLoading, queryInitialLoading } = storeToRefs(store)

  const closeFiltersModal = (): boolean => {
    return isOpenFiltersModal.value = false
  }
  const openFiltersModal = (): boolean => {
    return isOpenFiltersModal.value = true
  }

  return {
    transactions: data,
    transactionsLoading: queryLoading,
    initialLoading: queryInitialLoading,
    isOpenFiltersModal,
    closeFiltersModal,
    openFiltersModal
  }
}