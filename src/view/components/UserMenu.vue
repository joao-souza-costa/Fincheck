<template>
  <BaseDropdown.Root>
    <BaseDropdown.Trigger>
      <div
        class="bg-teal-0 rounded-full w-12 h-12 flex items-center justify-center border-teal-100"
      >
        <span class="text-sm font-medium text-teal-900 tracking-[-0.5px]">JS</span>
      </div>
    </BaseDropdown.Trigger>

    <BaseDropdown.Content class="w-32">
      <BaseDropdown.Item
        class="flex items-center justify-between"
        @select="handleSignout"
      >
        Sair
        <ExitIcon class="w-4 h-4" />
      </BaseDropdown.Item>
    </BaseDropdown.Content>
  </BaseDropdown.Root>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/app/store/useUserProvider'
import BaseDropdown from './Dropdown/BaseDropdown'
import ExitIcon from './icons/ExitIcon.vue'

const userStore = useUserStore()

const handleSignout = () => {
  userStore.signout()
}
</script>
