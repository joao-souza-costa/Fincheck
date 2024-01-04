import { provide, reactive, ref, type Ref } from "vue"

type tTransactionType = 'INCOME' | 'EXPENSE'
type tAccountType = 'CREATE' | 'EDIT'

export const MODALS_PROVIDER: string = 'newAccountModalProvider'

export type modalsProviderProps = {
  isOpenAccountModal: {
    CREATE: boolean
    EDIT: boolean
  }
  toggleAccountModal: (type: tAccountType) => void

  isOpenTransactionModal: {
    INCOME: boolean
    EXPENSE: boolean
  }
  closeTransactionModal: () => void
  openTransactionModal: (type: tTransactionType) => void
}

export function useModalsProvider() {
  const isOpenAccountModal = reactive({
    CREATE: false,
    EDIT: false,
  })

  const toggleAccountModal = (type: tAccountType): void => {
    isOpenAccountModal[type] = !isOpenAccountModal[type]
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
    isOpenAccountModal,
    toggleAccountModal,
    isOpenTransactionModal,
    closeTransactionModal,
    openTransactionModal,
  })
}