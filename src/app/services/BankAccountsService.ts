import { httpClient } from "./Client";

export interface bankAccountParams {
  name: string,
  initialBalance: string,
  color: string
  type: 'CHECKING' | 'INVESTMENT' | 'CASH'
}

export type bankAccountsResponse = {
  id: string
  name: string
  initialBalance: number
  type: 'CHECKING' | 'INVESTMENT' | 'CASH'
  color: string
  currentBalance: number
}

export default {
  create: async (params: bankAccountParams) => {
    const { data } = await httpClient.post('/bank-accounts', params)
    return data
  },
  getAll: async () => {
    const { data = [] } = await httpClient.get<bankAccountsResponse[]>('/bank-accounts')
    return data
  },
}