import { CityParam, UserParam } from "@/types/localData";

export const setLocalStorageData = (param: UserParam | CityParam, value: string) => {
  const item = 'akelon_' + param;
  localStorage.setItem(item, value)
}
