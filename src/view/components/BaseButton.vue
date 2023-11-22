<template>
  <button
    :disabled="disabled || isLoading"
    class="bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400 px-6 h-12 rounded-2xl font-medium text-white transition-all flex items-center justify-center"
  >
    <base-spinner class="w-6 h-6" v-if="isLoading" />
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
import BaseSpinner from './BaseSpinner.vue'

type iProps =  {
  isLoading?: boolean
  disabled?: boolean
}

defineProps<iProps>()
</script>

<style scoped></style>
