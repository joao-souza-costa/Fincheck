<template>
  <div>
    <button @click="$emit('close-categories')">'close'</button>
  </div>
</template>

<script setup lang="ts">
type tEmit = {
  (e: 'close-categories'): void
}

defineEmits<tEmit>()
</script>
