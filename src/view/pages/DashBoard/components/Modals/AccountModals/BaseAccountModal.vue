<template>
  <base-modal :title="modalLabel" :open="isOpen" @update:open="$emit('close')">
    <Form @submit="(v) => emit('submit', v)" :validation-schema="schema" class="mt-10">
      <span class="text-gray-600 tracking-[-0.5px] text-xs">Saldo</span>
      <div class="flex items-center gap-2">
        <span class="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
        <base-currency-input initial-value="0" name="initialBalance" />
      </div>
      <div class="mt-10 flex flex-col gap-4">
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
import BaseCurrencyInput from '@/view/components/BaseCurrencyInput.vue'
import BaseInput from '@/view/components/BaseInput.vue'
import BaseInputSelect from '@/view/components/BaseInputSelect.vue'
import ColorsDropdown from '../../Base/ColorsDropdown.vue'
import { useAccountModalController } from './BaseAccountModelController'

type iProps = {
  isOpen: boolean
  modalLabel: string
  buttonLabel?: String
}

type tEmit = {
  close: []
  submit: [v: GenericObject]
}

defineProps<iProps>()
const emit = defineEmits<tEmit>()

const { schema, options } = useAccountModalController()
</script>
