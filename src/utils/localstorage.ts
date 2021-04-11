import produce from 'immer'
import { localstorageName } from '../constants/devSettings'
import { LangStateType, SettingsStateType } from '../types/state'

type LocalstorageType = {
  lang?: LangStateType
  settings?: SettingsStateType
  volume?: number
}

export const lsGet = (
  name: keyof LocalstorageType | [keyof LocalstorageType, ...string[]],
): any => {
  const v = window.localStorage.getItem(localstorageName)
  if (v === null) {
    return null
  }
  const lsStore: LocalstorageType = JSON.parse(v)
  if (typeof name === 'string') {
    return lsStore[name]
  } else {
    return name.reduce<any>((acc, n) => acc?.[n] ?? null, lsStore)
  }
}

export const lsSet = (fn: (draft: LocalstorageType) => void): void => {
  const v = window.localStorage.getItem(localstorageName)
  const lsStore: LocalstorageType = v === null ? {} : JSON.parse(v)
  const retStore = produce(lsStore, fn)
  window.localStorage.setItem(localstorageName, JSON.stringify(retStore))
}