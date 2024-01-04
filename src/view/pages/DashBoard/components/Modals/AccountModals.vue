<template>
  <CreateAccountModal :is-open="isOpenAccountModal.CREATE" @close="toggleAccountModal('CREATE')" />
  <EditAccountModal :is-open="isOpenAccountModal.EDIT" @close="toggleAccountModal('EDIT')" />
</template>

<script setup lang="ts">
import { inject } from 'vue'
import CreateAccountModal from './AccountModals/CreateAccountModal.vue'
import EditAccountModal from './AccountModals/EditAccountModal.vue'
import { MODALS_PROVIDER, type modalsProviderProps } from '../../providers/modalsProvider'

const { isOpenAccountModal, toggleAccountModal } = inject(MODALS_PROVIDER) as modalsProviderProps
</script>
