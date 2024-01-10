import { httpClient } from "./Client";

export type Transaction = {
  id: string;
  date: string;
  name: string;
  value: number;
  type: 'INCOME' | 'EXPENSE';
  bankAccountId: string,
  category?: {
    id: string
    name: string
    icon: string
  }
}

export interface CreateTransactionParams {
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  type: Transaction['type']
}

export type GetAllTransactionFilters = {
  month: number;
  year: number;
  bankAccountId?: string;
  type?: Transaction['type']
}

export default {
  create: async (params: CreateTransactionParams) => {
    const { data } = await httpClient.post('/transactions', params);
    return data;
  },
  getAll: async (filters: GetAllTransactionFilters) => {
    const { data } = await httpClient.get<Transaction[]>('/transactions', {
      params: filters
    });
    return data;
  },
  update: async ({ id, ...params }) => {
    return {}
  },
  delete: async (id: string) => {
    return {}
  },
}