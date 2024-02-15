import type { TRANSACTION_TYPE } from "@/app/config/constants/transaction"
import { useCategoriesStore } from "@/app/store/useCategoriesStore"
import { storeToRefs } from "pinia"
import { computed } from "vue"

export function useCategoriesListController(categoryType: TRANSACTION_TYPE) {

  const { data: categories, queryLoading } = storeToRefs(useCategoriesStore())

  const categoriesFiltered = computed(() => categories.value?.filter(({ type }) => type === categoryType))

  return {
    categoriesFiltered,
    queryLoading
  }
}