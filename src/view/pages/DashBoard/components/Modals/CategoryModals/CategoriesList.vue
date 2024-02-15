<template>
  <section class="h-[511px]">
    <base-scroll-bar class="px-4">
      <category-option
        class="mt-2"
        v-for="category in categoriesFiltered"
        :key="category.id"
        :icon="category.icon"
        :name="category.name"
        :type="category.type"
        @click="$emit('submit', category)"
      />
    </base-scroll-bar>
  </section>
</template>

<script setup lang="ts">
import BaseScrollBar from '@/view/components/BaseScrollBar.vue'
import CategoryOption from './CategoryOption.vue'

import { useCategoriesListController } from './CategoriesListController'
import type { categoriesResponse } from '@/app/services/CategoriesService'
import type { TRANSACTION_TYPE } from '@/app/config/constants/transaction';

type tEmit = {
  (e: 'submit', category: categoriesResponse): void
}

const props = defineProps<{
  type: TRANSACTION_TYPE
}>()

const { categoriesFiltered } = useCategoriesListController(props.type)

defineEmits<tEmit>()
</script>
