import { useCategoriesStore } from "@/app/store/useCategoriesStore"
import { storeToRefs } from "pinia"
import { computed } from "vue"

export function useCategoriesListController(categoryType: 'INCOME' | 'EXPENSE') {

  const { data: categories, queryLoading } = storeToRefs(useCategoriesStore())

  const categoriesFiltered = computed(() => categories.value?.filter(({ type }) => type === categoryType))

  return {
    categoriesFiltered,
    queryLoading
  }
}