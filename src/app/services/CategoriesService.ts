import type { TRANSACTION_TYPE } from "../config/constants/transaction";
import { httpClient } from "./Client";

export interface categoriesResponse {
  id: string
  name: string,
  icon: string
  type: TRANSACTION_TYPE
}

interface categoryParams extends Omit<categoriesResponse, "id"> { }

export default {
  getAll: async () => {
    const { data } = await httpClient.get<categoriesResponse[]>('/categories')
    return data.reverse()
  },
  create: async (params: categoryParams) => {
    const { data } = await httpClient.post<categoriesResponse>('/categories', params)
    return data
  },
  update: async ({ id, ...params }: categoriesResponse) => {
    const { data } = await httpClient.put<categoriesResponse>(`/categories/${id}`, params)
    return data
  },
  delete: async (id: string) => {
    const { data } = await httpClient.delete(`/categories/${id}`)
    return data
  },
}