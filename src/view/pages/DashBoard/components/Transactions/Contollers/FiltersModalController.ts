import { computed, ref } from 'vue'
import { useAccountStore } from '@/app/store/useAccountStore'
import { storeToRefs } from 'pinia'
import { enumTransactionPeriodFilter } from '@/app/services/TransactionService'

export function useFiltersModalController() {
  const store = useAccountStore()
  const { data: accounts } = storeToRefs(store)

  const selectedAccountId = ref<undefined | string>(undefined)

  const handleSelectedId = (id: string): void => {
    const prevId = selectedAccountId.value
    prevId === id ? (selectedAccountId.value = undefined) : (selectedAccountId.value = id)
  }

  const selectedPeriod = ref<enumTransactionPeriodFilter>(enumTransactionPeriodFilter.monthly)

  const selectedPeriodIndex = computed<number>(() => {
    return Object.values(enumTransactionPeriodFilter).indexOf(selectedPeriod.value)
  })
  const handleSelectedPeriod = (swiper: any): void => {
    selectedPeriod.value = Object.values(enumTransactionPeriodFilter)[swiper.realIndex]
  }

  return {
    accounts,
    selectedAccountId,
    selectedPeriod,
    selectedPeriodIndex,
    handleSelectedId,
    handleSelectedPeriod,
  }
}