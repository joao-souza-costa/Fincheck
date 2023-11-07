import { httpClient } from "./Client";

export default {
  me: async () => {
    const { data } = await httpClient.get('/users/me')
    return data
  },
}