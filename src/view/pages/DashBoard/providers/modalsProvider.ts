import { provide, reactive, ref, type Ref } from "vue"

type tTransactionType = 'INCOME' | 'EXPENSE'

export const MODALS_PROVIDER: string = 'newAccountModalProvider'

export type modalsProviderProps = {
  isOpenNewAccountModal: Ref<boolean>
  closeNewAccountModal: () => void
  openNewAccountModal: () => void
  isOpenTransactionModal: {
    INCOME: boolean
    EXPENSE: boolean
  }
  closeTransactionModal: () => void
  openTransactionModal: (type: tTransactionType) => void
}



export function useModalsProvider() {
  const isOpenNewAccountModal = ref(false)

  const closeNewAccountModal = (): boolean => {
    return isOpenNewAccountModal.value = false
  }
  const openNewAccountModal = (): boolean => {
    return isOpenNewAccountModal.value = true
  }

  const isOpenTransactionModal = reactive({
    INCOME: false,
    EXPENSE: false
  })

  const closeTransactionModal = (): void => {
    isOpenTransactionModal.EXPENSE = false
    isOpenTransactionModal.INCOME = false
  }
  const openTransactionModal = (type: tTransactionType): void => {
    isOpenTransactionModal[type] = true
  }

  provide(MODALS_PROVIDER, {
    isOpenNewAccountModal,
    closeNewAccountModal,
    openNewAccountModal,
    isOpenTransactionModal,
    closeTransactionModal,
    openTransactionModal,
  })
}