import { httpClient } from "./Client";

export interface bankAccountParams {
  name: string,
  initialBalance: string,
  color: string
  type: 'CHECKING' | 'INVESTMENT' | 'CASH'
}

export interface UpdateBankAccountParams extends bankAccountParams {
  id: string
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
  update: async ({ id, ...params }: UpdateBankAccountParams) => {
    const { data } = await httpClient.put(`/bank-accounts/${id}`, params)
    return data
  },
  delete: async (id: string) => {
    const { data } = await httpClient.delete(`/bank-accounts/${id}`)
    return data
  },

}