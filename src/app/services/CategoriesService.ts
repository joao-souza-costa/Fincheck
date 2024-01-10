import { httpClient } from "./Client";

export type categoriesResponse = {
  id: string
  name: string,
  icon: string
  type: 'INCOME' | 'EXPENSE'
}

export default {
  getAll: async () => {
    const { data } = await httpClient.get<categoriesResponse[]>('/categories')
    return data
  },
}