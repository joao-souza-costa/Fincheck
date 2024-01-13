import { useTransactionsStore } from "@/app/store/useTransactionStore"
import { storeToRefs } from "pinia"
import { ref } from "vue"

export function useTransactionsController() {

  const isOpenFiltersModal = ref(false)

  const store = useTransactionsStore()
  const { data, queryLoading, queryInitialLoading, filters } = storeToRefs(store)

  const toggleFiltersModal = (): boolean => {
    return isOpenFiltersModal.value = !isOpenFiltersModal.value
  }
  const handleSelectTypeTransaction = (value: 'INCOME' | 'EXPENSE' | undefined) => {
    store.handleChangeFilters("type")(value)
  }

  const handleSwiperChange = (swiperInstance: any) => {
    store.handleChangeFilters("month")(swiperInstance.realIndex)
  }

  const handleApplyFilters = ({ bankAccountId, year }: {
    bankAccountId: string | undefined
    year: number
  }) => {
    store.handleChangeFilters("bankAccountId")(bankAccountId)
    store.handleChangeFilters("year")(year)
    toggleFiltersModal()
  }

  return {
    filters,
    transactions: data,
    transactionsLoading: queryLoading,
    initialLoading: queryInitialLoading,
    isOpenFiltersModal,
    toggleFiltersModal,
    handleSelectTypeTransaction,
    handleSwiperChange,
    handleApplyFilters
  }
}