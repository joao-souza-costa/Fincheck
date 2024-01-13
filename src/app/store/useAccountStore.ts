import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"
import { defineStore, storeToRefs } from "pinia"
import bankAccountsService from "../services/BankAccountsService"
import { useTransactionsStore } from "./useTransactionStore"
import { useUserStore } from "./useUserProvider"
import { computed } from "vue"

export const useAccountStore = defineStore('accounts', () => {
  const transactionStore = useTransactionsStore()
  const { groupedTransactionByAccount, filters } = storeToRefs(transactionStore)
  const { accessToken } = storeToRefs(useUserStore())

  const queryClient = useQueryClient()

  const { data: accounts, isLoading: queryLoading, isRefetching: isRefetchingLoading } = useQuery({
    queryKey: ['bankAccounts'],
    queryFn: bankAccountsService.getAll,
    enabled: accessToken
  })

  const { mutateAsync: createMutation, isLoading: createLoading } = useMutation(bankAccountsService.create)
  const { mutateAsync: updateMutation, isLoading: updateLoading } = useMutation(bankAccountsService.update)
  const { mutateAsync: deleteMutation, isLoading: deleteLoading } = useMutation(bankAccountsService.delete)

  const invalidateBankAccountsQuery = () => {
    return queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })
  }

  const createAccount = (values: any) => {
    return createMutation({
      ...values,
      initialBalance: 0
    }).then(invalidateBankAccountsQuery)
  }

  const updateAccount = (values: any, id: string) => {
    return updateMutation({
      ...values,
      initialBalance: Number(values.initialBalance),
      id
    }).then(invalidateBankAccountsQuery)
  }

  const deleteAccount = (id: string) => {
    return deleteMutation(id)
      .then(transactionStore.invalidateTransactionsQuery)
      .then(invalidateBankAccountsQuery)
  }

  const data = computed(() => {
    return accounts.value?.map((item) => {
      const currentBalance = groupedTransactionByAccount.value?.accounts[item.id] || 0
      return {
        ...item,
        currentBalance,
      }
    })
  })

  const filteredAccounts = computed(() => {
    if (filters?.value.bankAccountId) {
      const account = data.value?.find((item) => item.id === filters?.value.bankAccountId)
      return [account]
    }
    return data.value
  })

  const totalExpense = computed(() => {
    return groupedTransactionByAccount.value?.totalExpense ?? 0
  })

  const totalIncome = computed(() => {
    return groupedTransactionByAccount.value?.totalIncome ?? 0
  })

  return {
    data,
    filteredAccounts,
    totalExpense,
    totalIncome,
    queryLoading,
    createLoading,
    updateLoading,
    deleteLoading,
    isRefetchingLoading,
    invalidateBankAccountsQuery,
    createAccount,
    updateAccount,
    deleteAccount,
  }
})