import type { signInParams } from '@/app/services/AuthService'
import AuthService from '@/app/services/AuthService'
import { useMutation } from '@tanstack/vue-query'
import * as Yup from 'yup'

export function useLoginController() {

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (values: signInParams) => {
      return AuthService.signIn(values)

    }
  })

  async function onSubmit(values: any) {
    try {
      const { token } = await mutateAsync(values)
    } catch (e) {
      console.log(e)
    }
  }

  const schema = Yup.object().shape({
    email: Yup.string().email('Informe um email válido').required('Email é obrigatório'),
    password: Yup.string()
      .min(8, 'Senha deve ter pelo menos 8 digitos').required('Senha é obrigatória')
  })

  return {
    schema,
    onSubmit,
    isLoading
  }
}