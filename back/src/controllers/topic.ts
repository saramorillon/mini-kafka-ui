import { IpcMainInvokeEvent } from 'electron'
import { KafkaService } from '../services/kafka'
import { getConfig, updateConfig } from './config'

export async function getTopics(event: IpcMainInvokeEvent, server: string) {
  const client = await KafkaService.getClient(server)
  const admin = client.admin()
  await admin.connect()
  const { favorites } = await getConfig()
  const { topics } = await admin.fetchTopicMetadata()
  return topics.map((topic) => ({
    name: topic.name,
    partitions: topic.partitions.length,
    favorite: favorites.findIndex((favorite) => favorite.server === server && favorite.topic === topic.name) !== -1,
  }))
}

export async function getFavoriteTopics() {
  const { servers, favorites } = await getConfig()
  return favorites.map((favorite) => ({
    server: servers[favorite.server],
    name: favorite.topic,
  }))
}

export async function toggleTopicFavorite(event: IpcMainInvokeEvent, server: string, topic: string) {
  const { window, servers, favorites } = await getConfig()
  const index = favorites.findIndex((favorite) => favorite.server === server && favorite.topic === topic)
  if (index !== -1) {
    favorites.splice(index, 1)
  } else {
    favorites.push({ server, topic })
  }
  await updateConfig({ window, servers, favorites })
}
