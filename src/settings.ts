import { homedir } from 'os'
import path from 'path'

export const settings = {
  configDir: getConfigDir(),
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
