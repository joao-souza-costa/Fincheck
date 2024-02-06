import type { PERIODS } from "@/app/config/constants/dates"
import { useTransactionsStore } from "@/app/store/useTransactionStore"
import { storeToRefs } from "pinia"
import { computed, ref, watch } from "vue"

export function useTransactionsController() {

  const isOpenFiltersModal = ref(false)
  const slideLoading = ref(false)

  const store = useTransactionsStore()
  const { data, queryLoading, queryInitialLoading, filters, groupedTransactionByAccount } = storeToRefs(store)

  const toggleFiltersModal = (): boolean => {
    return isOpenFiltersModal.value = !isOpenFiltersModal.value
  }
  const handleSelectTypeTransaction = (value: 'INCOME' | 'EXPENSE' | undefined) => {
    store.handleChangeFilters("type")(value)
  }

  const handleSwiperChange = (value: string) => {
    store.handleChangeFilters("date")(value)
  }

  const handleApplyFilters = ({ bankAccountId, period }: {
    bankAccountId: string | undefined
    period: PERIODS
  }) => {
    store.handleChangeFilters("bankAccountId")(bankAccountId)
    store.handleChangeFilters("period")(period)
    toggleFiltersModal()
  }

  const transactionsLoading = computed(() => {
    return queryLoading.value || slideLoading.value
  })

  watch(queryLoading, () => {
    slideLoading.value = false
  })

  return {
    filters,
    transactions: data,
    transactionsLoading,
    initialLoading: queryInitialLoading,
    slideLoading,
    isOpenFiltersModal,
    toggleFiltersModal,
    handleSelectTypeTransaction,
    handleSwiperChange,
    handleApplyFilters,
  }
}