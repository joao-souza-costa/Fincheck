<template>
  <Form
    @submit="(v) => $emit('submit', v)"
    :validation-schema="schema"
    :initialValues="initialValues"
  >
    <base-currency-input name="value" :placeholder="balanceLabel" />

    <div class="mt-4 flex flex-col gap-4">
      <base-input
        name="name"
        type="text"
        id="transactionName"
        :placeholder="transactionNameLabel"
      />

      <Field name="categoryId" :model-value="category?.id" v-slot="{ errorMessage }" as="div">
        <category-input
          :category="category"
          :error-message="errorMessage"
          @open-categories="$emit('open-categories')"
        />
      </Field>

      <base-input-select
        name="paymentType"
        :options="paymentTypeOptions"
        :placeholder="paymentTypeLabel"
      />

      <base-input-select
        name="bankAccountId"
        :options="accountsOptions"
        :placeholder="paymentLabel"
      />

      <base-date-picker-input name="date" />

      <base-button type="submit" :is-loading="isLoading"> Salvar </base-button>
    </div>
  </Form>
</template>

<script setup lang="ts">
import type { Transaction } from '@/app/services/TransactionService'
import { Field, Form, type GenericObject } from 'vee-validate'
import BaseCurrencyInput from '@/view/components/BaseCurrencyInput.vue'
import BaseInput from '@/view/components/BaseInput.vue'
import BaseInputSelect from '@/view/components/BaseInputSelect.vue'
import BaseDatePickerInput from '@/view/components/BaseDatePickerInput.vue'
import { useBaseTransactionFormController } from './TransactionFormController'
import BaseButton from '@/view/components/BaseButton.vue'
import CategoryInput from './CategoryInput.vue'
import type { TRANSACTION_TYPE } from '@/app/config/constants/transaction'

type tProps = {
  isLoading: boolean
  initialValues?: Omit<Partial<Transaction>, 'categoryId'>
  category?: Transaction['category']
  type: TRANSACTION_TYPE
  balanceLabel: string
  transactionNameLabel: string
  categoryLabel: string
  paymentTypeLabel: string
  paymentLabel: string
}

type tEmit = {
  (e: 'submit', v: GenericObject): void
  (e: 'open-categories'): void
}

const props = withDefaults(defineProps<tProps>(), {
  initialValues: () => ({
    date: new Date()
  })
})

defineEmits<tEmit>()

const { schema, accountsOptions, paymentTypeOptions } = useBaseTransactionFormController(props.type)
</script>
