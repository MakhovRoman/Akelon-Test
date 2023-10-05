import { UserLocalParam, UserParam } from "@/types/localData";

export const separateString = (string: UserLocalParam) => {
  const separator = "akelon_";
  return string.split(separator)[1] as UserParam;
}
