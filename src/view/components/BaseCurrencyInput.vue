<template>
  <InputCurrency
    class="w-full text-gray-800 text-[32px] font-bold tracking-[-1px] outline-none"
    :model-value="String(value)"
    v-bind="number"
    @input:model-value="handleChange"
  />
</template>

<script setup lang="ts">
import { component as InputCurrency } from '@coders-tm/vue-number-format'
import { useField } from 'vee-validate'
import { computed, ref, toRef } from 'vue'

type iProps = {
  initialValue?: string
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

const { handleChange, value } = useField(name, undefined)
</script>

<style scoped></style>
