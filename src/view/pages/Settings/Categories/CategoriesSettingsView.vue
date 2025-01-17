<template>
  <section class="p-5 h-full">
    <categories-header :disabled="Boolean(data && data?.length > 19)" />

    <categories-table
      :data="data"
      :is-loading="isRefetchingLoading || queryLoading"
      @select="handleToggleEdit"
    />

    <edit-category-modal
      v-if="selected"
      is-open
      :category="selected"
      @open-delete="handleDelete"
      @close="handleToggleEdit(null)"
    />

    <confirm-delete-modal
      v-if="isOpenDeleteModal && deleteId"
      title="Excluir categoria"
      description="Tem certeza que deseja excluir essa categoria ?"
      :isLoading="deleteLoading || isRefetchingLoading"
      @confirm="onDelete(deleteId)"
      @cancel="closeDelete"
      @close="closeDelete"
    />
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { toast } from '@/app/utils/toast'
import { useCategoryStore } from '@/app/store/useCategoryStore'
import ConfirmDeleteModal from '@/view/components/ConfirmDeleteModal.vue'
import CategoriesHeader from './components/CategoriesHeader.vue'
import EditCategoryModal from './modals/EditCategoryModal.vue'
import CategoriesTable from './components/CategoriesTable.vue'
import type { categoriesResponse } from '@/app/services/CategoriesService'

const categoryStore = useCategoryStore()
const { data, isRefetchingLoading, queryLoading, deleteLoading } = storeToRefs(categoryStore)

const selected = ref<categoriesResponse | null>()

const handleToggleEdit = (category: categoriesResponse | null) => {
  selected.value = category
}

const isOpenDeleteModal = ref(false)
const deleteId = ref('')

const handleDelete = () => {
  isOpenDeleteModal.value = true
  deleteId.value = selected.value!.id
  selected.value = null
}

const closeDelete = () => {
  isOpenDeleteModal.value = false
  deleteId.value = ''
}

async function onDelete(id: string) {
  return categoryStore
    .deleteCategory(id)
    .then(() => toast.success('Categoria deletada com sucesso'))
    .then(closeDelete)
    .catch(() => toast.error('Não foi possivel deletar a sua Categoria'))
}
</script>
