
import * as Yup from 'yup'

export function useBaseTransactionModalController() {

  const schema = Yup.object().shape({
    balance: Yup.string().required('Saldo  é obrigatório'),
    name: Yup.string().required('Nome da transação é obrigatório'),
    type: Yup.mixed().required('Tipo é obrigatório').oneOf(['CHECKv ING', 'INVESTMENT', 'CASH']),
    paymentMethod: Yup.string().required('Método de pagamento é obrigatória')
  })
  /* 
    const { mutateAsync, isLoading } = useMutation({
      mutationFn: async (values: bankAccountParams) => {
        return bankAccountsService.create(values)
      }
    })
  */
  async function onSubmit(values: any) {
    console.log(values)
  }

  return {
    schema,
    onSubmit,
    initialValues: {}
  }
}