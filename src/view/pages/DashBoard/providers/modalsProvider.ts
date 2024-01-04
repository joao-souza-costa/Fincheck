import type { bankAccountParams, bankAccountsResponse } from "@/app/services/BankAccountsService"
import { provide, reactive } from "vue"

type tTransactionType = 'INCOME' | 'EXPENSE'
type tAccountType = 'CREATE' | 'EDIT'

export const MODALS_PROVIDER: string = 'newAccountModalProvider'

export type modalsProviderProps = {
  isOpenAccountModal: {
    CREATE: boolean
    EDIT: boolean
    EDIT_ACCOUNT: bankAccountsResponse
  }
  toggleAccountModal: (type: tAccountType, account?: bankAccountsResponse) => void

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
    EDIT_ACCOUNT: {}
  })

  const toggleAccountModal = (type: tAccountType, account?: bankAccountsResponse): void => {

    if (type === "EDIT" && account) isOpenAccountModal.EDIT_ACCOUNT = account

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