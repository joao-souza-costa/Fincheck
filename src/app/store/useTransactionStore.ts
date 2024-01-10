import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"
import { defineStore } from "pinia"
import transactionService from "../services/TransactionService"
import { computed } from "vue"



interface AccountsDictionary {
  [key: string]: number
}
export const useTransactionsStore = defineStore('transactions', () => {
  const queryClient = useQueryClient()

  const { data, isLoading: queryLoading, isInitialLoading: queryInitialLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => transactionService.getAll({ month: 0, year: 2024 })
  })

  const { mutateAsync: createMutation, isLoading: createLoading } = useMutation(transactionService.create)
  const { mutateAsync: updateMutation, isLoading: updateLoading } = useMutation(transactionService.update)
  const { mutateAsync: deleteMutation, isLoading: deleteLoading } = useMutation(transactionService.delete)

  const invalidateTransactionsQuery = async () => {
    return queryClient.invalidateQueries({ queryKey: ['transactions'] })
  }

  const createTransaction = (values: any) => {
    return createMutation({
      ...values,
      value: Number(values.value)
    }).then(invalidateTransactionsQuery)
  }

  const updateTransaction = (values: any, id: string) => {
    return updateMutation({
      ...values,
      initialBalance: Number(values.initialBalance),
      id
    }).then(invalidateTransactionsQuery)
  }

  const deleteTransaction = (id: string) => {
    return deleteMutation(id).then(invalidateTransactionsQuery)
  }

  const groupedTransactionByAccount = computed(() => {
    return data.value?.reduce((acc: {
      accounts: AccountsDictionary,
      totalIncome: number
      totalExpense: number
    }, item) => {
      const isExpense = item.type === "EXPENSE"
      isExpense ? acc.totalExpense += item.value : acc.totalIncome += item.value
      acc.accounts[item.bankAccountId] ?
        acc.accounts[item?.bankAccountId] += item.value :
        acc.accounts[item?.bankAccountId] = item.value

      return acc

    }, {
      accounts: {},
      totalExpense: 0,
      totalIncome: 0
    })
  })

  return {
    data,
    groupedTransactionByAccount,
    queryLoading,
    queryInitialLoading,
    createLoading,
    updateLoading,
    deleteLoading,
    invalidateTransactionsQuery,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  }
})