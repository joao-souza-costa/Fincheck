import { defineStore, storeToRefs } from "pinia"
import { useQuery } from "@tanstack/vue-query"
import categoriesService from "../services/CategoriesService"
import { useUserStore } from "./useUserStore"

export const useCategoriesStore = defineStore('categories', () => {

  const { accessToken } = storeToRefs(useUserStore())

  const { data, isLoading: queryLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesService.getAll,
    enabled: accessToken
  })

  return {
    data,
    queryLoading
  }
})