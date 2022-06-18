import { homedir } from 'os'
import path from 'path'
import { name } from '../package.json'

export const settings = {
  configDir: getConfigDir(),
  clientId: name,
}

function getConfigDir() {
  const { platform } = process
  switch (platform) {
    case 'win32':
      return path.join(homedir(), 'AppData', 'Roaming', 'mini-kafka-ui')
    case 'darwin':
      return path.join(homedir(), 'Library', 'Preferences', 'mini-kafka-ui')
    default:
      return path.join(homedir(), '.local', 'share', 'mini-kafka-ui')
  }
}
