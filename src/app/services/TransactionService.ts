import { PERIODS } from "../config/constants/dates";
import type { TRANSACTION_TYPE } from "../config/constants/transaction";
import type { categoriesResponse } from "./CategoriesService";
import { httpClient } from "./Client";

export type Transaction = {
  id: string;
  date: string | Date;
  name: string;
  value: number;
  type: TRANSACTION_TYPE;
  bankAccountId: string,
  category?: categoriesResponse
}

export interface CreateTransactionParams {
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  type: Transaction['type']
}

export interface CreateTransactionParams {
  id: string,
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  date: Date
}

export type GetAllTransactionFilters = {
  date: string,
  period: PERIODS,
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
  update: async ({ id, ...params }: Omit<CreateTransactionParams, 'type'>) => {
    const { data } = await httpClient.put<Transaction>(`/transactions/${id}`, params);
    return data;
  },
  delete: async (id: string) => {
    return httpClient.delete(`/transactions/${id}`);
  },
}