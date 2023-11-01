<template>
  <div class="relative w-full">
    <input
      class="bg-white w-full rounded-lg border border-gray-500 px-3 h-[55px] text-gray-800 pt-4 peer placeholder-shown:pt-0 outline-none focus:border-gray-800 transition-all"
      :name="inputId"
      :id="inputId"
      :type="type"
      placeholder=" "
    />
    <label
      class="absolute left-[13px] top-1 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 transition-all"
      :for="inputId"
    >
      {{ placeholder }}</label
    >
  </div>
</template>

<script setup lang="ts">
export interface iProps {
  type: string
  name?: string
  id: string
  placeholder: string
}
const props = withDefaults(defineProps<iProps>(), {
  type: 'hello'
})

const inputId = props.name ?? props.id
</script>
