<template>
  <component :is="current" />
</template>

<script setup lang="ts">
import { markRaw } from 'vue'
import { iconsMap } from './iconsMap'

type BankAccountTypeIconProps = {
  type: keyof typeof iconsMap
}
const props = defineProps<BankAccountTypeIconProps>()

const current = markRaw(iconsMap[props.type])
</script>

