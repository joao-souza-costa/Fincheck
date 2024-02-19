export function useCategoriesSettingsController() {

  const isOpenFiltersModal = ref(false)
  const slideLoading = ref(true)

  const { data, queryLoading, queryInitialLoading, filters } = storeToRefs(store)

  const toggleFiltersModal = (): boolean => {
    return isOpenFiltersModal.value = !isOpenFiltersModal.value
  }
  const handleSelectTypeTransaction = (value: TRANSACTION_TYPE | undefined) => {
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

  watch(queryLoading, (value) => slideLoading.value = value)

  return {
    filters,
    transactions: data,
    transactionsLoading: slideLoading,
    initialLoading: queryInitialLoading,
    slideLoading,
    isOpenFiltersModal,
    toggleFiltersModal,
    handleSelectTypeTransaction,
    handleSwiperChange,
    handleApplyFilters,
  }
}