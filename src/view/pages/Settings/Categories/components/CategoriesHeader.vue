<template>
  <div class="mb-10">
    <div class="flex items-center justify-between">
      <p class="text-3xl font-bold">Categorias</p>
      <base-button :disabled="disabled" variant="PRIMARY" label="Adicionar" @click="toggleModal" />
    </div>
    <p class="mt-5 text-1xl font-normal relative">
      Nesta página você vai poder gerenciar as suas categorias
    </p>
  </div>

  <create-category-modal v-if="isOpen" :is-open="isOpen" @close="toggleModal" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CreateCategoryModal from '../Modals/CreateCategoryModal.vue'
import BaseButton from '@/view/components/BaseButton.vue'

defineProps<{ disabled: boolean }>()

const isOpen = ref<boolean>(false)
const toggleModal = () => {
  isOpen.value = !isOpen.value
}
</script>
