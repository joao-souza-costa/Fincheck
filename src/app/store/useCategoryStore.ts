import { defineStore, storeToRefs } from "pinia"
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"
import categoriesService from "../services/CategoriesService"
import { useUserStore } from "./useUserStore"
import { computed } from "vue"

export const useCategoryStore = defineStore('categories', () => {

  const { accessToken } = storeToRefs(useUserStore())
  const queryClient = useQueryClient()

  const { data = [], isLoading: queryLoading, isRefetching: isRefetchingLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesService.getAll,
    enabled: accessToken
  })

  const { mutateAsync: createMutation, isLoading: createLoading } = useMutation(categoriesService.create)
  const { mutateAsync: updateMutation, isLoading: updateLoading } = useMutation(categoriesService.update)
  const { mutateAsync: deleteMutation, isLoading: deleteLoading } = useMutation(categoriesService.delete)

  const invalidateCategoriesQuery = () => {
    return queryClient.invalidateQueries({ queryKey: ['categories'] })
  }

  const createCategory = (values: any) => {
    return createMutation(values).then(invalidateCategoriesQuery)
  }

  const updateCategory = (values: any, id: string) => {
    return updateMutation({
      ...values,
      initialBalance: Number(values.initialBalance),
      id
    }).then(invalidateCategoriesQuery)
  }

  const deleteCategory = (id: string) => {
    return deleteMutation(id)
      .then(invalidateCategoriesQuery)
  }

  return {
    data,
    queryLoading,
    isRefetchingLoading,
    createLoading,
    updateLoading,
    deleteLoading,
    createCategory,
    updateCategory,
    deleteCategory,
  }
})