import { UserLocalData } from "@/types/localData"

export const getLocalStorageData = <T = UserLocalData>(...items: string[]): T =>
  items.reduce((obj, item) => {
    return {...obj, [item]:localStorage.getItem(item)}
  }, {} as T)

export const getLocalCityData = (param: string) => localStorage.getItem(param);
