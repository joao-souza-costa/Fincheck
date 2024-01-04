<template>
  <base-modal title="Excluir" open @update:open="$emit('close')">
    <div class="flex flex-col items-center text-center gap-6">
      <div class="w-[52px] h-[52px] rounded-full bg-red-0 flex items-center justify-center">
        <trash-icon class="w-6 h-6 text-red-900" />
      </div>
      <p class="w-[180px] text-gray-800 font-bold tracking-[-0.5px]">
        {{ title }}
      </p>
      <p class="tracking-[-0.5px]">
        {{ description }}
      </p>
    </div>

    <div class="mt-10 space-y-4">
      <base-button
        class="w-full"
        variant="DANGER"
        @click="$emit('confirm')"
        :is-loading="isLoading"
      >
        Sim, desejo excluir
      </base-button>

      <base-button class="w-full" variant="GHOST" @click="$emit('cancel')"> Cancelar </base-button>
    </div>
  </base-modal>
</template>

<script setup lang="ts">
import BaseButton from './BaseButton.vue'
import BaseModal from './BaseModal.vue'
import TrashIcon from './icons/TrashIcon.vue'

defineProps<{
  title: string
  description: string
  isLoading?: boolean
}>()
defineEmits<{ close: []; confirm: []; cancel: [] }>()
</script>

<style scoped></style>
