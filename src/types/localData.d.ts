type Prefics<P extends string, S extends string> = `${P}${S}`

export type UserParam = 'first_name' | 'last_name' | 'summary'
export type CityParam = 'city'

export type Akelon = 'akelon_'

export type UserLocalParam = Prefics<Akelon, UserParam>
export type CityLocalParam = Prefics<Akelon, CityParam>

export interface UserData extends Record<UserParam, string> {}
export interface UserLocalData extends Record<UserLocalParam, string> {}
