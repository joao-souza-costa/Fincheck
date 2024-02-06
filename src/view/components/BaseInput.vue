<template>
  <div class="relative w-full">
    <input
      class="bg-white w-full rounded-lg border border-gray-500 px-3 h-[55px] text-gray-800 pt-4 peer placeholder-shown:pt-0 outline-none focus:border-gray-800 transition-all"
      :class="[errorMessage && '!border-red-900 text-red-900']"
      :name="inputId"
      :id="inputId"
      :type="type"
      :value="value"
      @input="handleChange"
      @blur="handleBlur"
      placeholder=" "
    />
    <div v-if="errorMessage" class="flex gap-1 items-center mt-2 text-red-900">
      <CrossCircle />
      <span class="text-xs"> {{ errorMessage }} </span>
    </div>

    <label
      class="text-xs absolute left-[13px] top-1 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 transition-all"
      :class="[errorMessage && '!text-red-900']"
      :for="inputId"
    >
      {{ placeholder }}</label
    >
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import CrossCircle from '@/assets/CrossCircle.vue'
import { toRef } from 'vue'

export interface iProps {
  initialValue?: string
  name: string
  type: string
  id: string
  placeholder: string
}

const props = defineProps<iProps>()

const name = toRef(props, 'name')

const { errorMessage, handleBlur, handleChange, value } = useField(name, undefined, {
  initialValue: props.initialValue
})
const inputId = props.name ?? props.id
</script>
