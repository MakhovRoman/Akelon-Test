import { mockAPI } from "@/services/api/mockAPI"
import { UserParam, UserLocalData, UserLocalParam } from "@/types/localData"
import { separateString } from "./separateString"

export const conditionLocalUserData = (localData: UserLocalData, param: UserLocalParam) => {
  const key: UserParam = separateString(param);
  return localData[param] || mockAPI.getUser()[key]
}

export const conditionLocalCityData = (localData: string | null) => {
  return localData || Object.keys(mockAPI.getCities())[0]
}
