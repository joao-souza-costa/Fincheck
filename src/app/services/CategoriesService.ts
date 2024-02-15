import type { TRANSACTION_TYPE } from "../config/constants/transaction";
import { httpClient } from "./Client";

export interface categoriesResponse {
  id: string
  name: string,
  icon: string
  type: TRANSACTION_TYPE
}

export default {
  getAll: async () => {
    const { data } = await httpClient.get<categoriesResponse[]>('/categories')
    return data
  },
}