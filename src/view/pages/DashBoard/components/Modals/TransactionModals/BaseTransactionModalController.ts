
import * as Yup from 'yup'
import { useAccountStore } from "@/app/store/useAccountStore"
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import categoriesService from '@/app/services/CategoriesService'

export function useBaseTransactionModalController(type: string) {

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesService.getAll
  })

  const { data: accounts, queryLoading: accountLoading } = storeToRefs(useAccountStore())

  const accountsOptions = computed(() => {
    if (!accounts.value) return []

    return accounts.value?.map((acc) => ({ value: acc.id, label: acc.name }))
  })

  const categoriesOptions = computed(() => {
    if (!categories.value) return []

    return categories.value?.filter((category) => category.type === type)
      .map((acc) => ({ value: acc.id, label: acc.name }))
  })

  const schema = Yup.object().shape({
    value: Yup.string().required('Saldo  é obrigatório'),
    name: Yup.string().required('Nome da transação é obrigatório'),
    categoryId: Yup.mixed().required('Tipo é obrigatório'),
    bankAccountId: Yup.string().required('Método de pagamento é obrigatória'),
    date: Yup.date().required('Data é obrigatório')
  })

  return {
    schema,
    initialValues: { value: 0 },
    accountsOptions,
    accountLoading,
    categoriesOptions,
    categoriesLoading
  }
}