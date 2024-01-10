import { toast } from '@/app/utils/toast'
import { ref } from 'vue'
import { useAccountStore } from '@/app/store/useAccountStore'
import { storeToRefs } from 'pinia'


export function useEditAccountModalController(emit: Function) {
  const accounts = useAccountStore()
  const { updateLoading, deleteLoading, isRefetchingLoading } = storeToRefs(accounts)
  const isOpenDeleteModal = ref<boolean>(false)

  const handleDeleteModal = () => {
    isOpenDeleteModal.value = true
    emit('close')
  }

  async function onSubmit(values: any, id: string) {
    return accounts.updateAccount(values, id)
      .then(() => toast.success('Conta editada com sucesso'))
      .then(() => emit('close'))
      .catch(() => toast.error('Não foi possivel editar a sua conta'))
  }

  async function onDelete(id: string) {
    return accounts.deleteAccount(id)
      .then(() => toast.success('Conta deletada com sucesso'))
      .then(() => (isOpenDeleteModal.value = false))
      .catch(() => toast.error('Não foi possivel deletar a sua conta'))
  }

  return {
    isOpenDeleteModal,
    updateLoading,
    deleteLoading,
    queryLoading: isRefetchingLoading,
    handleDeleteModal,
    onSubmit,
    onDelete,

  }
}