<template>
  <div>
    <base-modal title="Filtros" :open="open" @update:open="$emit('close')">
      <div class="mt-5">
        <span class="text-lg tracking-[-1px] font-bold text-gray-800"> Contas </span>
      </div>
      <div class="h-44">
        <base-scroll-bar>
          <button
            class="p-2 rounded-2xl w-full text-left text-gray-800 hover:bg-gray-50"
            :class="{ '!bg-gray-200': selectedAccountId === account.id }"
            v-for="account in accounts"
            :key="account.id"
            @click="handleSelectedId(account.id)"
          >
            {{ account.name }}
          </button>
        </base-scroll-bar>
      </div>

      <div class="mt-3">
        <span class="text-lg tracking-[-1px] font-bold text-gray-800"> Período </span>
      </div>

      <div class="mt-3 w-60 flex items-center justify-between">
        <Swiper
          :initial-slide="selectedPeriodIndex"
          :slides-per-view="1"
          centered-slides
          @init="handlePeriodSwiper"
          @slide-change="handleSelectedPeriod"
        >
          <slider-navigation
            class="bg-white from-white"
            @slide-next="periodSwiper.slideNext()"
            @slide-prev="periodSwiper.slidePrev()"
          />
          <SwiperSlide
            v-for="(period, index) in enumTransactionPeriodFilter"
            :key="index"
            tag="p"
            class="text-center"
          >
            {{ period }}
          </SwiperSlide>
        </Swiper>
      </div>

      <base-button class="w-full mt-10" @click="handleApplyFilters"> Aplicar filtros</base-button>
    </base-modal>
  </div>
</template>

<script setup lang="ts">
import BaseScrollBar from '@/view/components/BaseScrollBar.vue'
import BaseButton from '@/view/components/BaseButton.vue'
import BaseModal from '@/view/components/BaseModal.vue'
import { useFiltersModalController } from './Contollers/FiltersModalController'
import { SwiperSlide, Swiper } from 'swiper/vue'
import { enumTransactionPeriodFilter } from '@/app/services/TransactionService'
import SliderNavigation from './SliderNavigation.vue'
import { ref } from 'vue'

type tFilters = {
  bankAccountId: string | undefined
  period: enumTransactionPeriodFilter
}

type iProps = {
  open: boolean
}
type iEmits = {
  (e: 'close'): void
  (e: 'applyFilters', v: tFilters): void
}

defineProps<iProps>()
const emit = defineEmits<iEmits>()

const {
  accounts,
  selectedAccountId,
  selectedPeriod,
  selectedPeriodIndex,
  handleSelectedId,
  handleSelectedPeriod
} = useFiltersModalController()

const periodSwiper = ref()

const handlePeriodSwiper = (swiper: any) => {
  periodSwiper.value = swiper
}

const handleApplyFilters = () => {
  emit('applyFilters', { bankAccountId: selectedAccountId.value, period: selectedPeriod.value })
}
</script>
