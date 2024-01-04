<template>
  <base-account-modal
    modal-label="Criar Conta"
    :is-open="isOpen"
    @close="$emit('close')"
    @submit="onSubmit"
  >
    <base-button type="submit" :is-loading="isLoading"> Criar </base-button>
  </base-account-modal>
</template>

<script setup lang="ts">
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { toast } from '@/app/utils/toast'
import BaseButton from '@/view/components/BaseButton.vue'
import BaseAccountModal from './BaseAccountModal.vue'
import bankAccountsService from '@/app/services/BankAccountsService'

defineProps<{ isOpen: boolean }>()
const emit = defineEmits<{ close: [] }>()

const queryClient = useQueryClient()

const { mutateAsync, isLoading } = useMutation(bankAccountsService.create)

async function onSubmit(values: any) {
  return mutateAsync({
    ...values,
    initialBalance: Number(values.initialBalance)
  })
    .then(() => queryClient.invalidateQueries({ queryKey: ['bankAccounts'] }))
    .then(() => toast.success('Conta criada com sucesso'))
    .then(() => emit('close'))
    .catch(() => toast.error('Erro durante a criação da conta'))
}
</script>
