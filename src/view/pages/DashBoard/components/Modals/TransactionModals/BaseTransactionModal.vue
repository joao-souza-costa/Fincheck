<template>
  <div>
    <base-modal :title="modalLabel" :open="openModal" @update:open="$emit('close')">
      <form @submit="onSubmit" :validation-schema="schema" :initialValues="initialValues">
        <span class="text-gray-600 tracking-[-0.5px] text-xs">{{ balanceLabel }}</span>
        <div class="flex items-center gap-2">
          <span class="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
          <base-currency-input name="balance" />
        </div>
        <div class="mt-10 flex flex-col gap-4">
          <base-input
            name="name"
            type="text"
            id="transactionName"
            :placeholder="transactionNameLabel"
          />
          <base-input-select name="type" :options="options" :placeholder="typeLabel" />
          <base-input-select name="paymentMethod" :options="options" :placeholder="paymentLabel" />
          <base-date-picker-input />
          <base-button> Salvar </base-button>
        </div>
      </form>
    </base-modal>
  </div>
</template>
<script setup lang="ts">
import { Form } from 'vee-validate'
import BaseModal from '@/view/components/BaseModal.vue'
import BaseCurrencyInput from '@/view/components/BaseCurrencyInput.vue'
import BaseInput from '@/view/components/BaseInput.vue'
import BaseInputSelect from '@/view/components/BaseInputSelect.vue'
import BaseButton from '@/view/components/BaseButton.vue'
import BaseDatePickerInput from '@/view/components/BaseDatePickerInput.vue'
import { useBaseTransactionModalController } from './BaseTransactionModalController'

const { onSubmit, schema, initialValues } = useBaseTransactionModalController()

type tProps = {
  openModal: boolean
  modalLabel: string
  balanceLabel: string
  transactionNameLabel: string
  typeLabel: string
  paymentLabel: string
}

type tEmit = {
  (e: 'close'): void
}

defineProps<tProps>()
defineEmits<tEmit>()

const options = [
  {
    value: 'CHECKING',
    label: 'Conta corrente'
  },
  {
    value: 'INVESTMENT',
    label: 'Investimentos'
  },
  {
    value: 'CASH',
    label: 'Dinheiro Físico'
  }
]
</script>
