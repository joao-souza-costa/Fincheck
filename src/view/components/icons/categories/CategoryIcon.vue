<template>
  <component :is="current" />
</template>

<script setup lang="ts">
import { computed, markRaw } from 'vue'
import { iconsMap } from './iconsMap'
import type { TRANSACTION_TYPE } from '@/app/config/constants/transaction'

type CategoryIconProps = {
  type: TRANSACTION_TYPE
  category?: string
}
const props = defineProps<CategoryIconProps>()

const current = computed(() =>
  markRaw(
    iconsMap[props.type][
      (props.category as keyof (typeof iconsMap.EXPENSE | typeof iconsMap.INCOME)) ?? 'default'
    ] || iconsMap[props.type].default
  )
)
</script>

<style scoped></style>
