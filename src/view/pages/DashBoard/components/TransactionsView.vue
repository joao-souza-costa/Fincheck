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
          <button class="flex items-center gap-2">
            <transactions-icon />
            <span class="text-sm text-gray-800 tracking-[-0.5px] font-medium">transações</span>
            <chevron-down-icon />
          </button>
          <button>
            <filter-icon />
          </button>
        </div>
        <div class="mt-6 relative">
          <swiper :slides-per-view="3" centered-slides>
            <slider-navigation />
            <SwiperSlide v-for="(month, index) in MONTHS" :key="index" v-slot="{ isActive }">
              <slider-options :month="month" :is-active="isActive" :index="index" />
            </SwiperSlide>
          </swiper>
        </div>
      </header>
      <div
        v-if="transactionsLoading"
        class="mt-4 flex space-y-2 flex-1 flex-col items-center justify-center"
      >
        <base-spinner class="w-10 h-10" />
      </div>

      <div v-else class="mt-4 space-y-2 flex-1 overflow-y-auto">
        <template v-if="!transactions.length">
          <div class="flex flex-col items-center justify-center h-full">
            <img :src="emptyState" alt="empty state" />
            <p class="text-gray-700">Não encontramos nenhuma transação</p>
          </div>
        </template>
        <template v-if="transactions.length">
          <div
            v-for="(_, index) in 20"
            :key="index"
            class="bg-white p-4 rounded-2xl flex items-center justify-between gap-4"
          >
            <div class="flex-1 flex items-center gap-3">
              <CategoryIcon type="income" />
              <div>
                <strong class="font-bold tracking-[-0.5px] block">Almoço</strong>
                <span class="text-sm text-gray-600">04/06/2023</span>
              </div>
            </div>
            <base-balance class="text-red-800 tracking-[-0.5px] font-medium" :balance="-123" />
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { MONTHS } from '@/app/config/constants/Date'
import { useTransactionsController } from './transactionsConstroller'
import BaseSpinner from '@/view/components/BaseSpinner.vue'
import ChevronDownIcon from '@/view/components/icons/ChevronDownIcon.vue'
import FilterIcon from '@/view/components/icons/FilterIcon.vue'
import TransactionsIcon from '@/view/components/icons/TransactionsIcon.vue'
import SliderOptions from './Transactions/SliderOptions.vue'
import SliderNavigation from './Transactions/SliderNavigation.vue'
import CategoryIcon from '@/view/components/icons/categories/CategoryIcon.vue'
import baseBalance from './base/baseBalance.vue'
import emptyState from '@/assets/empty-state.svg'

const { transactionsLoading, transactions, initialLoading } = useTransactionsController()
</script>
