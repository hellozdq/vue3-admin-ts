const TokenKey = 'token'
import { cusLocalStorage } from './index'

export function getToken() {
  return cusLocalStorage.get(TokenKey)
}

export function setToken(token: string) {
  return cusLocalStorage.set(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}
