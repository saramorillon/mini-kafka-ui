import { IApp } from '../models/IApp'

export function getApp(): Promise<IApp> {
  return pywebview.api.getApp()
}
