<template>
  <section class="p-5 h-full">
    <div class="mb-10">
      <div class="flex items-center justify-between">
        <p class="text-3xl font-bold">Categorias</p>
        <base-button @click="handleModal" variant="PRIMARY">Adicionar</base-button>
      </div>
      <p class="mt-5 text-1xl font-normal relative">
        Nesta página você vai poder gerenciar as suas categorias
      </p>
    </div>
    <p class="text-end">max: {{ data?.length }}/20</p>
    <div class="border-gray-300 border w-full h-4/5 overflow-hidden">
      <header class="sticky p-5 flex justify-between border border-b-gray-300">
        <span class="w-1/3">Nome</span>
        <span class="w-1/3 text-center md:text-start">Tipo</span>
        <span class="w-1/3 text-right md:text-start">Icone</span>
      </header>

      <div
        class="h-full flex items-center justify-center"
        v-if="isRefetchingLoading || queryLoading"
      >
        <base-spinner />
      </div>

      <div class="h-full flex flex-col items-center justify-center" v-if="!data?.length">
        <img :src="emptyState" alt="empty state" />
        <p class="text-gray-700 text-center">Não encontramos nenhuma categoria</p>
      </div>

      <base-scroll-bar v-if="data?.length">
        <div
          v-for="category in data"
          :key="category.id"
          @click="handleSelected(category)"
          class="py-3 px-5 cursor-pointer hover:bg-gray-100 flex items-center justify-between border border-b-gray-300 transition-all"
        >
          <div class="w-1/3">
            <span class="text-gray-700 text-base block text-ellipsis overflow-hidden">
              {{ category.name }}
            </span>
          </div>
          <div class="w-1/3 text-center md:text-start">
            <span class="text-gray-700 text-base block">
              {{ TRANSACTION_LABELS[category.type] }}
            </span>
          </div>
          <div class="w-1/3 flex justify-end md:block">
            <category-icon :type="category.type" :category="category.icon" class="h-10 w-10" />
          </div>
        </div>
      </base-scroll-bar>
    </div>

    <create-category-modal v-if="isOpen" :is-open="isOpen" @close="handleModal" />

    <edit-category-modal
      v-if="selected"
      :is-open="true"
      :category="selected"
      @open-delete="handleDelete"
      @close="handleCloseEditModal"
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
import emptyState from '@/assets/empty-state.svg'

import BaseSpinner from '@/view/components/BaseSpinner.vue'
import CategoryIcon from '@/view/components/icons/categories/CategoryIcon.vue'
import BaseScrollBar from '@/view/components/BaseScrollBar.vue'
import { useCategoryStore } from '@/app/store/useCategoryStore'
import { TRANSACTION_LABELS } from '@/app/config/constants/transaction'
import BaseButton from '@/view/components/BaseButton.vue'
import CreateCategoryModal from './Modals/CreateCategoryModal.vue'
import EditCategoryModal from './Modals/EditCategoryModal.vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import type { categoriesResponse } from '@/app/services/CategoriesService'
import ConfirmDeleteModal from '@/view/components/ConfirmDeleteModal.vue'
import { toast } from '@/app/utils/toast'

const categoryStore = useCategoryStore()
const { data, isRefetchingLoading, queryLoading, deleteLoading } = storeToRefs(categoryStore)

const isOpen = ref<boolean>(false)

const handleModal = () => {
  isOpen.value = !isOpen.value
}

const selected = ref<categoriesResponse | null>()

const handleSelected = (category: categoriesResponse) => {
  selected.value = category
}
const handleCloseEditModal = () => {
  selected.value = null
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

<style scoped></style>
