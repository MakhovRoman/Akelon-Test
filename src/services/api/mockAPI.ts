import { getData } from "@/utils/getData"

export const mockAPI = {
  getUser: async () => await getData('../mock/user.json'),
  getCities: async () => await getData('../mock/cities.json')
}
