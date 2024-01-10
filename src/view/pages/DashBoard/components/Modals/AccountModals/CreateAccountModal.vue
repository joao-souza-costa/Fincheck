<template>
  <base-account-modal
    v-if="isOpen"
    modal-label="Criar Conta"
    @close="$emit('close')"
    @submit="onSubmit"
  >
    <base-button type="submit" :is-loading="accountStore.createLoading"> Criar </base-button>
  </base-account-modal>
</template>

<script setup lang="ts">
import { toast } from '@/app/utils/toast'
import BaseButton from '@/view/components/BaseButton.vue'
import BaseAccountModal from './BaseAccountModal.vue'
import { useAccountStore } from '@/app/store/useAccountStore'

const accountStore = useAccountStore()

defineProps<{ isOpen: boolean }>()
const emit = defineEmits<{ close: [] }>()

async function onSubmit(values: any) {
  return accountStore
    .createAccount(values)
    .then(() => toast.success('Conta criada com sucesso'))
    .then(() => emit('close'))
    .catch(() => toast.error('Erro durante a criação da conta'))
}
</script>
