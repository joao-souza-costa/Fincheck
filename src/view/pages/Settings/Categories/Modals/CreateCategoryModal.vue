<template>
  <base-category-modal
    v-if="isOpen"
    label="Criar Categoria"
    @close="$emit('close')"
    @submit="onSubmit"
  >
    <base-button type="submit" :is-loading="categoriesStore.createLoading"> Criar </base-button>
  </base-category-modal>
</template>

<script setup lang="ts">
import { toast } from '@/app/utils/toast'
import BaseButton from '@/view/components/BaseButton.vue'
import BaseCategoryModal from './BaseCategoryModal.vue'
import { useCategoryStore } from '@/app/store/useCategoryStore'

const categoriesStore = useCategoryStore()

defineProps<{ isOpen: boolean }>()
const emit = defineEmits<{ close: [] }>()

async function onSubmit(values: any) {
  return categoriesStore
    .createCategory(values)
    .then(() => toast.success('Categoria criada com sucesso'))
    .then(() => emit('close'))
    .catch(() => toast.error('Erro durante a criação da categoria'))
}
</script>
