import { useTransactionsStore } from '@/app/store/useTransactionStore'
import { toast } from '@/app/utils/toast'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

export function useTransactionModalsController(emit: Function, type: 'EXPENSE' | 'INCOME') {
  const isOpenDeleteModal = ref<boolean>(false)
  const transactionId = ref<string | null>(null)

  const handleDeleteModal = (id: string) => {
    transactionId.value = id
    isOpenDeleteModal.value = true
    emit('close')
  }

  const label = {
    EXPENSE: 'Despesa',
    INCOME: 'Receita'
  }

  const transactionsStore = useTransactionsStore()
  const { deleteLoading, refetchingLoading, updateLoading } = storeToRefs(transactionsStore)

  async function onCreate(values: any) {
    return transactionsStore
      .createTransaction({ ...values, type })
      .then(() => toast.success(`${label[type]} criada com sucesso`))
      .then(() => emit('close'))
      .catch((e) => {
        toast.error(`Erro durante a criação da ${label[type]}`)
      })
  }

  async function onUpdate(id: string, values: any) {
    return transactionsStore
      .updateTransaction(id, { ...values, type })
      .then(() => toast.success(`${label[type]} atualizada com sucesso`))
      .then(() => emit('close'))
      .catch((e) => {
        toast.error(`Erro durante a atualização da ${label[type]}`)
      })
  }

  async function onDelete() {
    if (!transactionId.value) return

    return transactionsStore
      .deleteTransaction(transactionId.value)
      .then(() => toast.success(`${label[type]} excluida com sucesso`))
      .then(() => isOpenDeleteModal.value = false)
      .catch((e) => {
        toast.error(`Erro durante a exclusão da ${label[type]}`)
      })
  }

  return {
    onCreate,
    onUpdate,
    onDelete,
    handleDeleteModal,
    deleteLoading,
    queryLoading: refetchingLoading,
    isOpenDeleteModal,
    updateLoading,
  }
}