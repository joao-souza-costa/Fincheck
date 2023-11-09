<template>
  <component :is="current" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { iconsMap } from './iconsMap'

interface BankAccountTypeIconProps {
  type: keyof typeof iconsMap
}
const props = defineProps<BankAccountTypeIconProps>()

const current = ref(iconsMap[props.type])
</script>

<style scoped></style>
