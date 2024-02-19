import * as Yup from 'yup'
import { TRANSACTION_TYPE } from '@/app/config/constants/transaction'
export function useCategoryModalController() {

  const schema = Yup.object().shape({
    name: Yup.string().required('Nome da categoria é obrigatório'),
    type: Yup.mixed().required('Tipo é obrigatório').oneOf([TRANSACTION_TYPE.EXPENSE, TRANSACTION_TYPE.INCOME]),
    icon: Yup.string().required('Icone é obrigatório')
  })

  return {
    schema,
  }
}