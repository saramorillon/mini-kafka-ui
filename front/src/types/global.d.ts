import { IApp } from '../models/IApp'
import { IMessage } from '../models/IMessage'
import { IServer } from '../models/IServer'
import { ITopic } from '../models/ITopic'

declare global {
  const pywebview: {
    api: {
      onMove: (x: number, y: number) => Promise<void>
      openConfigDir: () => Promise<void>
      getApp: () => Promise<IApp>
      getServers: () => Promise<IServer[]>
      getServer: (key?: string) => Promise<IServer | undefined>
      saveServer: (server: IServer) => Promise<void>
      deleteServer: (server: IServer) => Promise<void>
      getTopics: (key: string) => Promise<ITopic[]>
      getFavoriteTopics: () => Promise<{ name: string; server: IServer }[]>
      toggleTopicFavorite: (key: string, topic: string) => Promise<void>
      startConsumer: (key: string, topic: string) => Promise<void>
      stopConsumer: (key: string, topic: string) => Promise<void>
      getMessages: (filters: Record<string, string>, page: number, limit: number) => Promise<IMessage[]>
      sendMessage: (key: string, topic: string, value: string) => Promise<void>
    }
  }
}
