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
        <category-option
          v-if="category"
          class="!border-gray-500 flex-row-reverse justify-between"
          :icon="category.icon"
          :name="category.name"
          :type="category.type"
          @click="$emit('open-categories')"
        />

        <base-button
          v-else
          class="w-full !justify-between !px-3 rounded-lg !border h-[55px]"
          :class="[
            errorMessage ? '!border-red-900 text-red-900' : '!border-gray-500 !text-gray-700'
          ]"
          :variant="'GHOST'"
          @click="$emit('open-categories')"
        >
          <span> Categoria </span>
          <span>
            <ChevronRightIcon
              class="w-6 h-6 text-gray-700"
              :class="[errorMessage && ' text-red-900']"
            />
          </span>
        </base-button>

        <base-input-error :error-message="errorMessage" />
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
import ChevronRightIcon from '@/view/components/icons/ChevronRightIcon.vue'
import BaseInputError from '@/view/components/BaseInputError.vue'
import CategoryOption from '../Modals/CategoryModals/CategoryOption.vue'

type tProps = {
  isLoading: boolean
  initialValues?: Omit<Partial<Transaction>, 'categoryId'>
  category?: Transaction['category']
  type: 'INCOME' | 'EXPENSE'
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
