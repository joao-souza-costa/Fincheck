<template>
  <button
    :class="$attrs.class"
    class="absolute top-1/2 -translate-y-1/2 bg-gradient-to-r from-gray-100 to-transparent left-0 bg-gray-100 z-10 flex items-center justify-center w-12 h-12"
    @click="$emit('slidePrev')"
  >
    <chevron-left-icon class="w-6 h-6 text-gray-800" />
  </button>
  <button
    :class="$attrs.class"
    class="absolute top-1/2 -translate-y-1/2 bg-gradient-to-l from-gray-100 to-transparent right-0 bg-gray-100 z-10 flex items-center justify-center w-12 h-12"
    @click="$emit('slideNext')"
  >
    <chevron-right-icon class="w-6 h-6 text-gray-800" />
  </button>
</template>

<script setup lang="ts">
import ChevronLeftIcon from '@/view/components/icons/ChevronLeftIcon.vue'
import ChevronRightIcon from '@/view/components/icons/ChevronRightIcon.vue'

type tEmit = {
  slidePrev: []
  slideNext: []
}

defineEmits<tEmit>()
</script>

<style scoped></style>
