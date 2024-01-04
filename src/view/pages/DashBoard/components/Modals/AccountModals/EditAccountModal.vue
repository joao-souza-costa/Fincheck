<template>
  <base-account-modal
    modal-label="Editar Conta"
    button-label="Editar"
    :is-open="isOpen"
    @close="$emit('close')"
  />
</template>

<script setup lang="ts">
import BaseAccountModal from './BaseAccountModal.vue'
defineProps<{ isOpen: boolean }>()
defineEmits<{ close: [] }>()
</script>
