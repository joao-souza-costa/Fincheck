import { useTransactionsStore } from '@/app/store/useTransactionStore'
import { toast } from '@/app/utils/toast'

export function useIncomeModalController(emit: Function) {
  const transactionsStore = useTransactionsStore()

  async function createIncome(values: any) {
    return transactionsStore
      .createTransaction({ ...values, type: 'INCOME' })
      .then(() => toast.success('Receita criada com sucesso'))
      .then(() => emit('close'))
      .catch((e) => {
        toast.error('Erro durante a criação da Receita')
      })
  }
  async function updateIncome(id: string, values: any) {
    return transactionsStore
      .updateTransaction(id, { ...values, type: 'INCOME' })
      .then(() => toast.success('Receita editada com sucesso'))
      .then(() => emit('close'))
      .catch((e) => {
        toast.error('Erro durante a edição da Receita')
      })
  }
  return {
    createIncome,
    updateIncome
  }
}