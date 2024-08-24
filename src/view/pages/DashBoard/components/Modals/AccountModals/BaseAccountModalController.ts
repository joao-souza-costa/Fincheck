import * as Yup from 'yup'

export function useAccountModalController() {

  const options = [
    {
      value: 'CHECKING',
      label: 'Conta corrente'
    },
    {
      value: 'INVESTMENT',
      label: 'Investimentos'
    },
    {
      value: 'CASH',
      label: 'Dinheiro Físico'
    }
  ]

  const schema = Yup.object().shape({
    name: Yup.string().required('Nome da conta é obrigatório'),
    type: Yup.mixed().required('Tipo é obrigatório').oneOf(options.map(({ value }) => value)),
    color: Yup.string().required('Cor é obrigatória')
  })

  return {
    schema,
    options
  }
}