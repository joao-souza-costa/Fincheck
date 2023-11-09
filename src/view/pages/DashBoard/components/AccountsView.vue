<template>
  <div class="bg-teal-900 rounded-2xl h-full w-full md:p-10 px-4 py-8 flex flex-col">
    <div>
      <span class="text-white block tracking-[-0.5px]">Saldo Total</span>
      <div class="flex flex-row items-center gap-2">
        <strong class="text-2xl tracking-[-1px] text-white">R$ 1000,00</strong>
        <button class="w-8 h-8 flex items-center justify-center" @click="toggleEye">
          <eye-icon :open="eyeOpen" />
        </button>
      </div>
    </div>

    <div class="flex flex-1 flex-col justify-end">
      <div class="flex items-center justify-between">
        <strong class="text-white tracking-[-1px] text-lg"> Minhas compras </strong>

        <div>
          <button
            class="py-3 pl-2.5 pr-2.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40"
          >
            <chevron-left-icon class="text-white w-6 h-6" />
          </button>

          <button
            class="py-3 pl-2.5 pr-2.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40"
          >
            <chevron-right-icon class="text-white w-6 h-6" />
          </button>
        </div>
      </div>
      <div class="mt-4">
        <swiper :space-between="16" :slides-per-view="2.1">
          <swiper-slide>
            <account-card :balance="123" color="#7950F2" name="Nubank" type="CASH" />
          </swiper-slide>

          <swiper-slide>
            <account-card :balance="10003" color="#333" name="XP" type="INVESTMENT" />
          </swiper-slide>

          <swiper-slide>
            <account-card :balance="10003" color="#0f0" name="Carteira" type="CHECKING" />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>
ƒ
<script lang="ts" setup>
import AccountCard from './AccountCard.vue'
import EyeIcon from '@/view/components/icons/EyeIcon.vue'
import ChevronLeftIcon from '@/view/components/icons/ChevronLeftIcon.vue'
import ChevronRightIcon from '@/view/components/icons/ChevronRightIcon.vue'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/vue'
import { ref } from 'vue'

const swiperRef = useSwiper()

console.log(swiperRef)

const eyeOpen = ref<boolean>(true)

const toggleEye = (): void => {
  eyeOpen.value = !eyeOpen.value
}
</script>
