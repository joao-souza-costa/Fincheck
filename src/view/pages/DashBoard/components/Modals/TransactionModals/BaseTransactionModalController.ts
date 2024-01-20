
import * as Yup from 'yup'
import { useAccountStore } from "@/app/store/useAccountStore"
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import categoriesService from '@/app/services/CategoriesService'
import { PaymentTypes } from '@/app/config/constants/paymentTypes'

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

  const paymentTypeOptions = ref([
    {
      value: PaymentTypes.CASH,
      label: 'Dinheiro'
    },
    {
      value: PaymentTypes.CREDIT,
      label: 'Cartão de crédito'
    },
    {
      value: PaymentTypes.BILLET,
      label: 'Boleto'
    },
    {
      value: PaymentTypes.DEBIT,
      label: 'Cartão de débito'
    },
    {
      value: PaymentTypes.PIX,
      label: 'PIX'
    },
  ])


  const schema = Yup.object().shape({
    value: Yup.string().required('Saldo  é obrigatório'),
    name: Yup.string().required('Nome da transação é obrigatório'),
    categoryId: Yup.mixed().required('Categoria é obrigatória'),
    bankAccountId: Yup.string().required('Destino do pagamento é obrigatória'),
    date: Yup.date().required('Data é obrigatório'),
    paymentType: Yup.string().required('Método de pagamento é obrigatório')
  })

  return {
    schema,
    accountsOptions,
    accountLoading,
    categoriesOptions,
    paymentTypeOptions,
    categoriesLoading
  }
}