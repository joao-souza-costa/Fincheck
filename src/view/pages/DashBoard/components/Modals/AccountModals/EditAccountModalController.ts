import bankAccountsService, { type bankAccountsResponse } from '@/app/services/BankAccountsService'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { toast } from '@/app/utils/toast'
import { ref } from 'vue'

export function useEditAccountModalController(emit: Function) {
  const isOpenDeleteModal = ref<boolean>(false)

  const handleDeleteModal = () => {
    isOpenDeleteModal.value = true
    emit('close')
  }

  const queryClient = useQueryClient()

  const { mutateAsync: updateMutation, isLoading: updateLoading } = useMutation(
    bankAccountsService.update
  )
  const { mutateAsync: deleteMuration, isLoading: deleteLoading } = useMutation(
    bankAccountsService.delete
  )

  async function onSubmit(values: any, id: string) {
    return updateMutation({
      ...values,
      initialBalance: Number(values.initialBalance),
      id: id
    })
      .then(() => queryClient.invalidateQueries({ queryKey: ['bankAccounts'] }))
      .then(() => toast.success('Conta editada com sucesso'))
      .then(() => emit('close'))
      .catch(() => toast.error('Não foi possivel editar a sua conta'))
  }

  async function onDelete(id: string) {
    return deleteMuration(id)
      .then(() => queryClient.invalidateQueries({ queryKey: ['bankAccounts'] }))
      .then(() => toast.success('Conta deletada com sucesso'))
      .then(() => (isOpenDeleteModal.value = false))
      .catch(() => toast.error('Não foi possivel deletar a sua conta'))
  }

  return {
    isOpenDeleteModal,
    updateLoading,
    deleteLoading,
    handleDeleteModal,
    onSubmit,
    onDelete,

  }
}