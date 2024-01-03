<template>
  <div>
    <base-modal :title="modalLabel" :open="openModal" @update:open="$emit('close')">
      <form>
        <span class="text-gray-600 tracking-[-0.5px] text-xs">{{ balanceLabel }}</span>
        <div class="flex items-center gap-2">
          <span class="text-gray-600 tracking-[-0.5px] text-lg">RS</span>
          <base-currency-input v-model="value" />
        </div>
        <div class="mt-10 flex flex-col gap-4">
          <base-input
            type="text"
            id="transactionName"
            name="name"
            :placeholder="transactionNameLabel"
          />
          <base-input-select v-model="selectValue" :options="options" :placeholder="typeLabel" />
          <base-input-select
            v-model="paymentMethod"
            :options="options"
            :placeholder="paymentLabel"
          />
          <base-date-picker-input />
          <base-button> Salvar </base-button>
        </div>
      </form>
    </base-modal>
  </div>
</template>
<script setup lang="ts">
import BaseModal from '@/view/components/BaseModal.vue'
import { ref } from 'vue'
import BaseCurrencyInput from '@/view/components/BaseCurrencyInput.vue'
import BaseInput from '@/view/components/BaseInput.vue'
import BaseInputSelect from '@/view/components/BaseInputSelect.vue'
import BaseButton from '@/view/components/BaseButton.vue'
import BaseDatePickerInput from '@/view/components/BaseDatePickerInput.vue'

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

const value = ref(0)
const selectValue = ref('')
const paymentMethod = ref('')

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
