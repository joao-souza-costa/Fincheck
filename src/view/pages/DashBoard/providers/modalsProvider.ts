import type { bankAccountsResponse } from "@/app/services/BankAccountsService"
import type { Transaction } from "@/app/services/TransactionService"
import { provide, reactive, ref } from "vue"

type tTransactionType = 'INCOME' | 'EXPENSE'
type tAccountType = 'CREATE' | 'EDIT'

export const MODALS_PROVIDER: string = 'newAccountModalProvider'

export type modalsProviderProps = {
  isOpenAccountModal: {
    CREATE: boolean
    EDIT: boolean
    EDIT_ACCOUNT: bankAccountsResponse | undefined
  }
  toggleAccountModal: (type: tAccountType, account?: bankAccountsResponse) => void

  isOpenTransactionModal: {
    INCOME: boolean
    EXPENSE: boolean
    EDIT_TRANSACTION: Transaction | undefined
  }
  toggleTransactionModal: (type: tTransactionType, transaction?: Transaction) => void
  isOpenDeleteModal: boolean,
  toggleDeleteModal: (value?: boolean) => void
}

export function useModalsProvider() {

  const isOpenAccountModal = reactive<modalsProviderProps['isOpenAccountModal']>({
    CREATE: false,
    EDIT: false,
    EDIT_ACCOUNT: undefined
  })

  const toggleAccountModal = (type: tAccountType, account?: bankAccountsResponse): void => {
    if (type === "EDIT" && account) isOpenAccountModal.EDIT_ACCOUNT = account
    isOpenAccountModal[type] = !isOpenAccountModal[type]
  }

  const isOpenTransactionModal = reactive<modalsProviderProps['isOpenTransactionModal']>({
    INCOME: false,
    EXPENSE: false,
    EDIT_TRANSACTION: undefined
  })

  const toggleTransactionModal = (type: tTransactionType, transaction: Transaction): void => {

    if (isOpenTransactionModal[type]) isOpenTransactionModal.EDIT_TRANSACTION = undefined //close modal reset editTransaction

    if (transaction) isOpenTransactionModal.EDIT_TRANSACTION = { ...transaction, value: Math.abs(transaction.value), date: new Date(transaction.date) }

    isOpenTransactionModal[type] = !isOpenTransactionModal[type]
  }

  const isOpenDeleteModal = ref<boolean>(false)

  const toggleDeleteModal = (value: boolean = !isOpenDeleteModal.value) => {
    isOpenDeleteModal.value = value
  }

  provide(MODALS_PROVIDER, {
    isOpenAccountModal,
    toggleAccountModal,
    isOpenTransactionModal,
    toggleTransactionModal,
    isOpenDeleteModal,
    toggleDeleteModal
  })
}