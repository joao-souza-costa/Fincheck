import * as Yup from 'yup'
import { useMutation } from '@tanstack/vue-query'
import AuthService, { type signUpParams } from '@/app/services/AuthService'
import { useUserStore } from '@/app/store/useUserProvider'
import { useRouter } from 'vue-router'
import { DASHBOARD } from '@/app/config/constants/route'
import { toast } from '@/app/utils/toast'

export function useRegisterController() {
  const userStore = useUserStore()
  const router = useRouter()

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (values: signUpParams) => {
      return AuthService.signUp(values)
    }
  })

  async function onSubmit(values: any) {
    try {
      const { token } = await mutateAsync(values)
      userStore.signin(token)
      router.push(DASHBOARD)
    } catch (e) {
      toast.error('Credenciais inválidas')
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