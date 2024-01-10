<template>
  <base-modal :title="modalLabel" open @update:open="$emit('close')">
    <template #right-action>
      <slot name="right-action" />
    </template>
    <Form
      @submit="(v) => emit('submit', v)"
      :initial-values="initialValues"
      :validation-schema="schema"
      class="mt-5"
    >
      <div class="flex flex-col gap-4">
        <base-input type="text" id="name" name="name" placeholder="Nome da conta" />
        <base-input-select name="type" :options="options" placeholder="Tipo" />
        <colors-dropdown name="color" />
        <slot />
      </div>
    </Form>
  </base-modal>
</template>

<script setup lang="ts">
import { Form, type GenericObject } from 'vee-validate'
import BaseModal from '@/view/components/BaseModal.vue'
import BaseInput from '@/view/components/BaseInput.vue'
import BaseInputSelect from '@/view/components/BaseInputSelect.vue'
import ColorsDropdown from '../../Base/ColorsDropdown.vue'
import { useAccountModalController } from './BaseAccountModelController'
import type { bankAccountsResponse } from '@/app/services/BankAccountsService'

type iProps = {
  modalLabel: string
  buttonLabel?: String
  initialValues?: bankAccountsResponse
}

type tEmit = {
  close: []
  submit: [v: GenericObject]
}

defineProps<iProps>()

const emit = defineEmits<tEmit>()

const { schema, options } = useAccountModalController()
</script>
