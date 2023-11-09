<template>
  <component :is="current" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { iconsMap } from './iconsMap'

interface CategoryIconProps {
  type: 'income' | 'expense'
  category?: string
}
const props = defineProps<CategoryIconProps>()

const current = ref(
  iconsMap[props.type][
    (props.category as keyof (typeof iconsMap.expense | typeof iconsMap.income)) ?? 'default'
  ] || iconsMap[props.type].default
)
</script>

<style scoped></style>
