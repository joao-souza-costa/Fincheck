<template>
  <div class="bg-gray-100 rounded-2xl w-full h-full p-10 flex flex-col">
    <template v-if="initialLoading">
      <div class="w-full h-full flex justify-center items-center">
        <base-spinner class="w-10 h-10" />
      </div>
    </template>

    <template v-else>
      <header>
        <div class="flex items-center justify-between">
          <TransactionsDropdown :selected="filters.type" @select="handleSelectTypeTransaction" />
          <button @click="toggleFiltersModal">
            <filter-icon />
          </button>
        </div>
        <TransactionDatesSlider
          :filter="filters.period"
          :value="filters.date"
          @slide-start="() => (slideLoading = true)"
          @change-value="handleSwiperChange"
        />
      </header>
      <div
        v-if="transactionsLoading"
        class="mt-4 flex space-y-2 flex-1 flex-col items-center justify-center"
      >
        <base-spinner class="w-10 h-10" />
      </div>

      <div v-else class="mt-4 space-y-2 flex-1 overflow-y-auto">
        <template v-if="!transactions?.length">
          <div class="flex flex-col items-center justify-center h-full">
            <img :src="emptyState" alt="empty state" />
            <p class="text-gray-700 text-center">Não encontramos nenhuma transação</p>
          </div>
        </template>
        <template v-if="transactions?.length">
          <div
            v-for="(transaction, index) in transactions"
            @click.stop="toggleTransactionModal(transaction.type, transaction)"
            :key="index"
            class="bg-white p-4 rounded-2xl flex items-center justify-between gap-4 cursor-pointer"
          >
            <div class="flex-1 flex items-center gap-3">
              <CategoryIcon
                :type="transaction.type === TRANSACTION_TYPE.EXPENSE ? 'expense' : 'income'"
                :category="transaction?.category?.icon"
              />
              <div>
                <strong class="font-bold tracking-[-0.5px] block">{{ transaction.name }}</strong>
                <span class="text-sm text-gray-600">{{
                  formatDate(new Date(transaction.date))
                }}</span>
              </div>
            </div>
            <base-balance
              class="tracking-[-0.5px] font-medium"
              :class="[
                transaction.type === TRANSACTION_TYPE.EXPENSE ? 'text-red-800' : 'text-green-800'
              ]"
              :balance="transaction.value"
            />
          </div>
        </template>
      </div>
    </template>
    <filters-modal
      :open="isOpenFiltersModal"
      @close="toggleFiltersModal"
      @apply-filters="handleApplyFilters"
    >
      Filtros...
    </filters-modal>
  </div>
</template>

<script lang="ts" setup>
import { useTransactionsController } from './transactionsConstroller'
import BaseSpinner from '@/view/components/BaseSpinner.vue'
import FilterIcon from '@/view/components/icons/FilterIcon.vue'
import { TransactionDatesSlider } from './Transactions/TransactionDatesSlider'
import CategoryIcon from '@/view/components/icons/categories/CategoryIcon.vue'
import BaseBalance from '@/view/components/BaseBalance.vue'
import emptyState from '@/assets/empty-state.svg'
import TransactionsDropdown from './Transactions/TransactionsDropdown.vue'
import FiltersModal from './Modals/FiltersModal.vue'
import { formatDate } from '@/app/utils/formatDate'
import { MODALS_PROVIDER, type modalsProviderProps } from '../providers/modalsProvider'
import { inject } from 'vue'
import { TRANSACTION_TYPE } from '@/app/config/constants/transaction'

const { toggleTransactionModal } = inject(MODALS_PROVIDER) as modalsProviderProps
const {
  filters,
  transactionsLoading,
  transactions,
  initialLoading,
  isOpenFiltersModal,
  slideLoading,
  toggleFiltersModal,
  handleSwiperChange,
  handleApplyFilters,
  handleSelectTypeTransaction
} = useTransactionsController()
</script>

<style>
#transaction-view .swiper-slide-active button {
  background-color: white;
}
</style>
