import { useTransactionsStore } from '@/app/store/useTransactionStore'
import { toast } from '@/app/utils/toast'

export function useExpenseModalController(emit: Function) {

  const transactionsStore = useTransactionsStore()

  async function createExpense(values: any) {
    return transactionsStore
      .createTransaction({ ...values, type: 'EXPENSE' })
      .then(() => toast.success('Despesa criada com sucesso'))
      .then(() => emit('close'))
      .catch((e) => {
        toast.error('Erro durante a criação da Despesa')
      })
  }

  async function updateExpense(id: string, values: any) {
    return transactionsStore
      .updateTransaction(id, { ...values, type: 'EXPENSE' })
      .then(() => toast.success('Despesa atualizada com sucesso'))
      .then(() => emit('close'))
      .catch((e) => {
        toast.error('Erro durante a atualização da Despesa')
      })
  }

  return {
    createExpense,
    updateExpense
  }
}