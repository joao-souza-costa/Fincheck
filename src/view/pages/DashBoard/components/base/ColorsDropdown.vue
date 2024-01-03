<template>
  <div>
    <BaseDropdown.Root>
      <BaseDropdown.Trigger>
        <button
          class="relative bg-white w-full rounded-lg border text-start border-gray-500 px-3 h-[55px] text-gray-800 outline-none focus:border-gray-800 transition-all"
          :class="[errorMessage && '!border-red-900 text-red-900']"
        >
          Cor

          <div class="absolute right-3 bottom-3">
            <ChevronDownIcon v-if="!selected" class="w-6 h-6 text-gray-800" />
            <color-icon v-if="selected" :bg="selected.bg" :color="selected.color" />
          </div>
        </button>
      </BaseDropdown.Trigger>

      <BaseDropdown.Content class="grid grid-cols-4">
        <BaseDropdown.Item v-for="color in colors" :key="color.bg" @select="handleSelect(color)">
          <color-icon :bg="color.bg" :color="color.color" />
        </BaseDropdown.Item>
      </BaseDropdown.Content>
    </BaseDropdown.Root>

    <div v-if="errorMessage" class="flex gap-1 items-center mt-2 text-red-900">
      <CrossCircle />
      <span class="text-xs"> {{ errorMessage }} </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import CrossCircle from '@/assets/CrossCircle.vue'
import BaseDropdown from '@/view/components/Dropdown/BaseDropdown'
import ChevronDownIcon from '@/view/components/icons/ChevronDownIcon.vue'
import ColorIcon from '@/view/components/icons/ColorIcon.vue'
import { ref } from 'vue'

type iProps = {
  errorMessage?: string
}

defineProps<iProps>()

type Color = {
  color: string
  bg: string
}

const colors: Color[] = [
  { color: '#868E96', bg: '#F8F9FA' },
  { color: '#FA5252', bg: '#FFF5F5' },
  { color: '#E64980', bg: '#FFF0F6' },
  { color: '#BE4BDB', bg: '#F8F0FC' },
  { color: '#7950F2', bg: '#F3F0FF' },
  { color: '#4C6EF5', bg: '#EDF2FF' },
  { color: '#228BE6', bg: '#E7F5FF' },
  { color: '#15AABF', bg: '#E3FAFC' },
  { color: '#12B886', bg: '#E6FCF5' },
  { color: '#40C057', bg: '#EBFBEE' },
  { color: '#82C91E', bg: '#F4FCE3' },
  { color: '#FAB005', bg: '#FFF9DB' },
  { color: '#FD7E14', bg: '#FFF4E6' },
  { color: '#212529', bg: '#F8F9FA' }
]

const selected = ref<null | Color>(null)

const handleSelect = (value: Color) => {
  selected.value = value
}
</script>

<style scoped></style>
