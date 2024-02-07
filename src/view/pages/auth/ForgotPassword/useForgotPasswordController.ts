import AuthService from '@/app/services/AuthService'
import { toast } from '@/app/utils/toast'
import { useMutation } from '@tanstack/vue-query'
import { ref } from 'vue'
import * as Yup from 'yup'

export function useForgotPasswordController() {

  const successRequest = ref<boolean>(false)

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (value: { email: string }) => {
      return AuthService.forgotPassword(value)
    }
  })

  async function onSubmit(values: any) {
    return await mutateAsync(values)
      .then(() => successRequest.value = true)
      .catch(() => toast.error('Não foi possível fazer a solicitação de resete de senha'))
  }

  const schema = Yup.object().shape({
    email: Yup.string().email('Informe um email válido').required('Email é obrigatório'),
  })

  return {
    schema,
    onSubmit,
    isLoading,
    successRequest
  }
}