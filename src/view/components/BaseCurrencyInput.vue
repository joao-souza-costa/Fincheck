<template>
  <span class="text-gray-600 tracking-[-0.5px] text-xs" :class="[errorMessage && ' text-red-900']">
    {{ placeholder }}
  </span>

  <div class="flex items-center gap-2 relative pb-5">
    <span
      class="text-gray-600 tracking-[-0.5px] text-lg"
      :class="[errorMessage && ' text-red-900']"
    >
      R$
    </span>
    <InputCurrency
      class="w-full text-gray-800 text-[32px] font-bold tracking-[-1px] outline-none"
      :class="[errorMessage && ' text-red-900']"
      :model-value="String(value)"
      v-bind="number"
      @input:model-value="handleChange"
    />
    <div
      v-if="errorMessage"
      class="flex gap-1 left-1 bottom-1 items-center mt-2 text-red-900 absolute"
    >
      <CrossCircle />
      <span class="text-xs"> {{ errorMessage }} </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import CrossCircle from '@/assets/CrossCircle.vue'
import { component as InputCurrency } from '@coders-tm/vue-number-format'
import { useField } from 'vee-validate'
import { computed, ref, toRef } from 'vue'

type iProps = {
  initialValue?: string
  placeholder: string
  name: string
}

const props = defineProps<iProps>()

const number = {
  decimal: ',',
  separator: '.',
  precision: 2,
  masked: false,
  min: 0,
  nullValue: 0,
  minimumFractionDigits: 2,
  reverseFill: true
}

const name = toRef(props, 'name')

const { handleChange, value, errorMessage } = useField(name, undefined)
</script>

<style scoped></style>
