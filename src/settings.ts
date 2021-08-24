import { homedir } from 'os'
import path from 'path'

export const settings = {
  configDir: getConfigDir(),
}

function getConfigDir() {
  const { platform } = process
  switch (platform) {
    case 'win32':
      return path.join(homedir(), 'AppData', 'Roaming', 'Mini Kafka UI')
    case 'darwin':
      return path.join(homedir(), 'Library', 'Preferences')
    default:
      return path.join(homedir(), '.local', 'share')
  }
}
