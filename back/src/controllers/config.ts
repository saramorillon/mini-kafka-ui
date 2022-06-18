import { shell } from 'electron'
import { promises } from 'fs'
import merge from 'lodash.mergewith'
import path from 'path'
import { IConfig } from '../models/IConfig'
import { settings } from '../settings'

const configFile = path.join(settings.configDir, 'config.json')

export function openConfigDir(): void {
  void shell.openPath(settings.configDir)
}

export async function getConfig(): Promise<IConfig> {
  try {
    const input = await promises.readFile(configFile, 'utf8')
    return JSON.parse(input)
  } catch (error) {
    const config: IConfig = { window: { x: 0, y: 0, maximized: true }, servers: [] }
    await promises.writeFile(configFile, JSON.stringify(config), 'utf8')
    return config
  }
}

export async function updateConfig(config: Partial<IConfig>): Promise<void> {
  const baseConfig = await getConfig()
  await promises.writeFile(configFile, JSON.stringify(merge(baseConfig, config, customizer)), 'utf8')
}

function customizer(objValue: unknown, srcValue: unknown) {
  if (Array.isArray(objValue)) return objValue.concat(srcValue)
}
