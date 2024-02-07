import { computed, ref } from 'vue'
import { useAccountStore } from '@/app/store/useAccountStore'
import { storeToRefs } from 'pinia'
import { useTransactionsStore } from '@/app/store/useTransactionStore'
import { PERIODS } from '@/app/config/constants/dates'

export function useFiltersModalController() {
  const store = useAccountStore()
  const transactionStore = useTransactionsStore()

  const { data: accounts } = storeToRefs(store)
  const { filters } = storeToRefs(transactionStore)

  const selectedAccountId = ref<undefined | string>(undefined)

  const handleSelectedId = (id: string): void => {
    const prevId = selectedAccountId.value
    prevId === id ? (selectedAccountId.value = undefined) : (selectedAccountId.value = id)
  }

  const selectedPeriod = ref<PERIODS>(filters.value.period)

  const selectedPeriodIndex = computed<number>(() => {
    return Object.values(PERIODS).indexOf(selectedPeriod.value)
  })
  const handleSelectedPeriod = (swiper: any): void => {
    selectedPeriod.value = Object.values(PERIODS)[swiper.realIndex]
  }

  const PERIODSwiper = ref()

  const handlePERIODSwiper = (swiper: any) => {
    PERIODSwiper.value = swiper
  }


  return {
    accounts,
    selectedAccountId,
    selectedPeriod,
    selectedPeriodIndex,
    PERIODSwiper,
    handlePERIODSwiper,
    handleSelectedId,
    handleSelectedPeriod,
  }
}