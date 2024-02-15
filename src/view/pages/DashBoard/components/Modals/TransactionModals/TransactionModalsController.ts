import { useTransactionsStore } from '@/app/store/useTransactionStore'
import { toast } from '@/app/utils/toast'
import { storeToRefs } from 'pinia'
import { inject, ref } from 'vue'
import { MODALS_PROVIDER, type modalsProviderProps } from '../../../providers/modalsProvider'
import { TRANSACTION_TYPE } from '@/app/config/constants/transaction'

export function useTransactionModalsController() {

  const { isOpenTransactionModal, toggleTransactionModal, isOpenDeleteModal, toggleDeleteModal } =
    inject(MODALS_PROVIDER) as modalsProviderProps

  const label = {
    EXPENSE: 'Despesa',
    INCOME: 'Receita'
  }

  const transactionsStore = useTransactionsStore()
  const { deleteLoading, refetchingLoading, updateLoading } = storeToRefs(transactionsStore)

  async function onCreate({ values, type }: { values: any, type: TRANSACTION_TYPE }) {
    return transactionsStore
      .createTransaction({ ...values, type })
      .then(() => toast.success(`${label[type]} criada com sucesso`))
      .then(() => toggleTransactionModal(type))
      .catch((e) => {
        toast.error(`Erro durante a criação da ${label[type]}`)
      })
  }

  async function onUpdate({ id, values, type }: { id: string, values: any, type: TRANSACTION_TYPE }) {
    return transactionsStore
      .updateTransaction(id, { ...values, type })
      .then(() => toast.success(`${label[type]} atualizada com sucesso`))
      .then(() => toggleTransactionModal(type))
      .catch((e) => {
        toast.error(`Erro durante a atualização da ${label[type]}`)
      })
  }
  async function onDelete(id: string) {
    if (!id) return
    return transactionsStore
      .deleteTransaction(id)
      .then(() => toast.success(`Exclusão concluida com sucesso`))
      .catch((e) => {
        toast.error(`Erro durante a exclusão`)
      })
  }

  const transactionId = ref<string>('')
  const title = ref<string>('')

  const openDelete = async (id: string, type: TRANSACTION_TYPE) => {
    title.value = `Tem certeza que deseja excluir esta ${type === TRANSACTION_TYPE.EXPENSE ? 'receita' : 'despesa'}`
    transactionId.value = id
    toggleDeleteModal()
    toggleTransactionModal(type)
  }

  const handleDelete = () => {
    onDelete(transactionId.value).then(() => toggleDeleteModal())
  }


  return {
    deleteLoading,
    queryLoading: refetchingLoading,
    updateLoading,
    isOpenTransactionModal,
    isOpenDeleteModal,
    transactionId,
    title,
    onCreate,
    onUpdate,
    onDelete,
    openDelete,
    toggleTransactionModal,
    toggleDeleteModal,
    handleDelete
  }
}