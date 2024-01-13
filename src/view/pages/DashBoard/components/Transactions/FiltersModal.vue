<template>
  <div>
    <base-modal title="Filtros" :open="open" @update:open="$emit('close')">
      <div>
        <span class="text-lg tracking-[-1px] font-bold text-gray-800"> Contas </span>
      </div>
      <div class="space-y-2 mt-2">
        <button
          class="p-2 rounded-2xl w-full text-left text-gray-800 hover:bg-gray-50"
          :class="{ '!bg-gray-200': selectedAccountId === account.id }"
          v-for="account in accounts"
          :key="account.id"
          @click="handleSelectedId(account.id)"
        >
          {{ account.name }}
        </button>
      </div>

      <div class="mt-10">
        <span class="text-lg tracking-[-1px] font-bold text-gray-800"> Ano </span>
      </div>

      <div class="mt-2 w-52 flex items-center justify-between">
        <button class="w-12 h-12 flex items-center justify-center" @click="handleSelectedYear(-1)">
          <chevron-left-icon class="w-6 h-6" />
        </button>

        <div class="flex-1 text-center">
          <span class="text-sm font-medium tracking-[-0.5px]"> {{ selectedYear }} </span>
        </div>

        <button class="w-12 h-12 flex items-center justify-center" @click="handleSelectedYear(1)">
          <chevron-right-icon class="w-6 h-6" />
        </button>
      </div>

      <base-button class="w-full mt-10" @click="handleApplyFilters"> Aplicar filtros</base-button>
    </base-modal>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/view/components/BaseButton.vue'
import BaseModal from '@/view/components/BaseModal.vue'
import ChevronLeftIcon from '@/view/components/icons/ChevronLeftIcon.vue'
import ChevronRightIcon from '@/view/components/icons/ChevronRightIcon.vue'
import { useFiltersModalController } from './Contollers/FiltersModalController'

type tFilters = {
  bankAccountId: string | undefined
  year: number
}

type iProps = {
  open: boolean
}
type iEmits = {
  (e: 'close'): void
  (e: 'applyFilters', v: tFilters): void
}

defineProps<iProps>()
const emit = defineEmits<iEmits>()

const { accounts, selectedAccountId, selectedYear, handleSelectedId, handleSelectedYear } =
  useFiltersModalController()

const handleApplyFilters = () => {
  emit('applyFilters', { bankAccountId: selectedAccountId.value, year: selectedYear.value })
}
</script>
