<template>
  <div>
    <base-modal
      title="Nova conta"
      :open="isOpenNewAccountModal"
      @update:open="closeNewAccountModal"
    >
      <form>
        <span class="text-gray-600 tracking-[-0.5px] text-xs">saldo</span>
        <div class="flex items-center gap-2">
          <span class="text-gray-600 tracking-[-0.5px] text-lg">RS</span>
          <base-currency-input v-model="value" />
        </div>
        <div class="mt-10 flex flex-col gap-4">
          <base-input type="text" id="initialBalance" name="name" placeholder="Nome da conta" />
          <base-input-select v-model="selectValue" :options="options" placeholder="Tipo" />
          <colors-dropdown />
          <base-button> Criar </base-button>
        </div>
      </form>
    </base-modal>
  </div>
</template>

<script setup lang="ts">
import BaseModal from '@/view/components/BaseModal.vue'
import { inject, ref } from 'vue'
import BaseCurrencyInput from '@/view/components/BaseCurrencyInput.vue'
import BaseInput from '@/view/components/BaseInput.vue'
import BaseInputSelect from '@/view/components/BaseInputSelect.vue'
import ColorsDropdown from '../Base/ColorsDropdown.vue'
import BaseButton from '@/view/components/BaseButton.vue'
import { MODALS_PROVIDER, type modalsProviderProps } from '../../providers/modalsProvider'

const { isOpenNewAccountModal, closeNewAccountModal } = inject(
  MODALS_PROVIDER
) as modalsProviderProps

const value = ref(0)
const selectValue = ref('')

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
