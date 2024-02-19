<template>
  <div>
    <BaseDropdown.Root>
      <BaseDropdown.Trigger>
        <button
          class="flex items-center justify-between bg-white w-full rounded-lg border text-start border-gray-500 px-3 h-[55px] text-gray-800 outline-none focus:border-gray-800 transition-all"
          :class="[errorMessage && '!border-red-900 text-red-900']"
        >
          Icone

          <div class="">
            <ChevronDownIcon v-if="!selected" class="w-6 h-6 text-gray-800" />
            <category-icon
              v-if="selected"
              :type="type"
              :category="String(selected)"
              class="h-10 w-10"
            />
          </div>
        </button>
      </BaseDropdown.Trigger>

      <BaseDropdown.Content class="grid grid-cols-4">
        <BaseDropdown.Item
          v-for="icon in categoryIconsArray"
          :key="icon"
          @select="handleSelect(icon)"
        >
          <category-icon :type="type" :category="icon" class="h-10 w-10" />
        </BaseDropdown.Item>
      </BaseDropdown.Content>
    </BaseDropdown.Root>

    <div v-if="errorMessage" class="flex gap-1 items-center mt-2 text-red-900">
      <CrossCircle />
      <span class="text-xs"> {{ errorMessage }} </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import CrossCircle from '@/assets/CrossCircle.vue'
import BaseDropdown from '@/view/components/Dropdown/BaseDropdown'
import ChevronDownIcon from '@/view/components/icons/ChevronDownIcon.vue'
import CategoryIcon from '@/view/components/icons/categories/CategoryIcon.vue'
import { useField } from 'vee-validate'
import { computed, ref, toRef } from 'vue'
import type { TRANSACTION_TYPE } from '@/app/config/constants/transaction'

type iProps = {
  initialValue?: string
  type: TRANSACTION_TYPE
  name: string
}

const categoryArray = {
  INCOME: ['default', 'travel'],
  EXPENSE: [
    'default',
    'food',
    'fun',
    'grocery',
    'home',
    'education',
    'clothes',
    'transport',
    'travel',
    'salon'
  ]
}

const props = defineProps<iProps>()

const name = toRef(props, 'name')
const { errorMessage, setValue, value } = useField(name, undefined)

const categoryIconsArray = computed(() => {
  return categoryArray[props.type]
})
const selected = ref<string | unknown>(value.value)

const handleSelect = (value: string) => {
  selected.value = value
  setValue(value)
}
</script>

<style scoped></style>
