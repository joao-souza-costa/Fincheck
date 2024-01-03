<template>
  <InputCurrency
    class="w-full text-gray-800 text-[32px] font-bold tracking-[-1px] outline-none"
    v-model="value"
    v-bind="number"
    @input:model-value="handleValue"
  />
</template>

<script setup lang="ts">
import { component as InputCurrency } from '@coders-tm/vue-number-format'
import { computed, ref } from 'vue'

type iProps = {
  modelValue: number
}

type iEmit = {
  (e: 'update:modelValue', v: number): void
}

const props = defineProps<iProps>()
const emit = defineEmits<iEmit>()

const value = ref(props.modelValue)

const number = {
  decimal: ',',
  separator: '.',
  prefix: 'R$ ',
  precision: 2,
  masked: false,
  min: 0,
  nullValue: 0,
  minimumFractionDigits: 2,
  reverseFill: true
}

const handleValue = (value: number): void => {
  return emit('update:modelValue', value)
}
</script>

<style scoped></style>
