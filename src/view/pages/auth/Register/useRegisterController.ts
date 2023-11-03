import * as Yup from 'yup'
import AuthService, { type signUpParams } from '@/app/services/AuthService'
import { useMutation } from '@tanstack/vue-query'
import { inject } from 'vue'

export function useRegisterController() {

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (values: signUpParams) => {
      return AuthService.signUp(values)
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
    name: Yup.string(),
    email: Yup.string().email('Informe um email válido').required('Email é obrigatório'),
    password: Yup.string()
      .min(8, 'Senha deve ter pelo menos 8 digitos').required('Senha é obrigatória'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'As senhas precisam ser iguais')
  })

  return {
    schema,
    onSubmit,
    isLoading,
  }

}