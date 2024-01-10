<template>
  <div>
    <base-modal :title="modalLabel" :open="openModal" @update:open="$emit('close')">
      <Form
        @submit="(v) => $emit('submit', v)"
        :validation-schema="schema"
        :initialValues="initialValues"
      >
        <span class="text-gray-600 tracking-[-0.5px] text-xs">{{ balanceLabel }}</span>
        <div class="flex items-center gap-2">
          <span class="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
          <base-currency-input name="value" />
        </div>
        <div class="mt-10 flex flex-col gap-4">
          <base-input
            name="name"
            type="text"
            id="transactionName"
            :placeholder="transactionNameLabel"
          />
          <base-input-select
            name="categoryId"
            :options="categoriesOptions"
            :placeholder="typeLabel"
          />

          <base-input-select
            name="bankAccountId"
            :options="accountsOptions"
            :placeholder="paymentLabel"
          />

          <base-date-picker-input name="date" />
          <base-button type="submit"> Salvar </base-button>
        </div>
      </Form>
    </base-modal>
  </div>
</template>
<script setup lang="ts">
import { Form, type GenericObject } from 'vee-validate'
import BaseModal from '@/view/components/BaseModal.vue'
import BaseCurrencyInput from '@/view/components/BaseCurrencyInput.vue'
import BaseInput from '@/view/components/BaseInput.vue'
import BaseInputSelect from '@/view/components/BaseInputSelect.vue'
import BaseButton from '@/view/components/BaseButton.vue'
import BaseDatePickerInput from '@/view/components/BaseDatePickerInput.vue'
import { useBaseTransactionModalController } from './BaseTransactionModalController'

type tProps = {
  openModal: boolean
  type: 'INCOME' | 'EXPENSE'
  modalLabel: string
  balanceLabel: string
  transactionNameLabel: string
  typeLabel: string
  paymentLabel: string
}

type tEmit = {
  (e: 'close'): void
  (e: 'submit', v: GenericObject): void
}

const props = defineProps<tProps>()
defineEmits<tEmit>()

const { schema, initialValues, accountsOptions, categoriesOptions } =
  useBaseTransactionModalController(props.type)
</script>
