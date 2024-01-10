<template>
  <base-account-modal
    v-if="isOpen"
    modal-label="Editar Conta"
    button-label="Editar"
    :initial-values="account"
    @close="$emit('close')"
    @submit="(v) => onSubmit(v, account.id)"
  >
    <template #right-action>
      <trash-icon role="button" class="w-6 h-6 text-red-800" @click="handleDeleteModal" />
    </template>
    <base-button type="submit" :is-loading="updateLoading || queryLoading"> Salvar </base-button>
  </base-account-modal>

  <confirm-delete-modal
    v-if="isOpenDeleteModal"
    title="Tem certeza que deseja excluir esta conta"
    description="Ao excluir a conta, também serão excluídos todos os registros de receita e despesas relacionados."
    :is-loading="deleteLoading || queryLoading"
    @confirm="onDelete(account.id)"
    @cancel="isOpenDeleteModal = false"
    @close="isOpenDeleteModal = false"
  />
</template>

<script setup lang="ts">
import type { bankAccountsResponse } from '@/app/services/BankAccountsService'
import BaseAccountModal from './BaseAccountModal.vue'
import BaseButton from '@/view/components/BaseButton.vue'
import TrashIcon from '@/view/components/icons/TrashIcon.vue'
import ConfirmDeleteModal from '@/view/components/ConfirmDeleteModal.vue'
import { useEditAccountModalController } from './EditAccountModalController'

const props = defineProps<{ isOpen: boolean; account: bankAccountsResponse }>()
const emit = defineEmits<{ close: [] }>()

const {
  isOpenDeleteModal,
  updateLoading,
  deleteLoading,
  queryLoading,
  handleDeleteModal,
  onSubmit,
  onDelete
} = useEditAccountModalController(emit)
</script>
