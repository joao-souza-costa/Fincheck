<template>
  <button
    @click="swiper.slideTo(index)"
    :class="
      cn(
        'w-full rounded-full h-12 text-sm text-gray-800 tracking-[-0.5px] font-medium',
        isActive && 'bg-white'
      )
    "
  >
    {{ month }}
  </button>
</template>

<script lang="ts" setup>
import cn from '@/app/utils/cn'
import { useSwiper } from 'swiper/vue'
const swiper = useSwiper()

type iSliderOptions = {
  month: string
  isActive: boolean
  index: number
}

defineProps<iSliderOptions>()
</script>
