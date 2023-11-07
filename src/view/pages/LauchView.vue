<template>
  <TransitionRoot
    :show="isLoading"
    enter="transition-opacity duration-75"
    enter-from="opacity-0"
    enter-to="opacity-100"
    leave="transition-opacity duration-150"
    leave-from="opacity-100"
    leave-to="opacity-0"
  >
    <div class="bg-teal-900 fixed top-0 left-0 grid place-items-center h-full w-full">
      <div class="flex flex-col items-center gap-4">
        <fincheck-logo class="h-10 text-white" />
        <base-spinner class="text-teal-900 fill-white" />
      </div>
    </div>
  </TransitionRoot>
</template>

<script setup lang="ts">
import FincheckLogo from '../components/FincheckLogo.vue'
import BaseSpinner from '../components/BaseSpinner.vue'
import { TransitionRoot } from '@headlessui/vue'

interface iLaunchProps {
  isLoading: boolean
}

defineProps<iLaunchProps>()
</script>
