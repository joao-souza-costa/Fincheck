<template>
  <button
    class="flex-1 flex items-center w-full h-[55px] p-2 gap-3 border border-gray-125 rounded-lg cursor-pointer hover:bg-gray-50 transition-all"
    :class="$attrs.class"
  >
    <CategoryIcon
      :type="type === TRANSACTION_TYPE.EXPENSE ? 'expense' : 'income'"
      :category="icon"
      class="h-10 w-10"
    />
    <div>
      <span class="text-gray-700 text-base block">{{ name }}</span>
    </div>
  </button>
</template>

<script setup lang="ts">
import { TRANSACTION_TYPE } from '@/app/config/constants/transaction'
import CategoryIcon from '@/view/components/icons/categories/CategoryIcon.vue'

type tProp = {
  name: string
  icon: string
  type: TRANSACTION_TYPE
}

defineProps<tProp>()
</script>
