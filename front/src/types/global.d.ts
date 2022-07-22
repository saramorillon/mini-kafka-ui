declare global {
  type Queries =
    | 'OpenConfigDir'
    | 'GetTopics'
    | 'GetFavoriteTopics'
    | 'ToggleFavoriteTopic'
    | 'GetServers'
    | 'GetServer'
    | 'SaveServer'
    | 'DeleteServer'
    | 'GetMessages'
    | 'SendMessage'
    | 'StartConsumer'
    | 'StopConsumer'

  type WindowBinding = {
    [q in Queries]: (param: {
      request: string
      onSuccess: (response: string) => void
      onFailure: (code: string, message: string) => void
    }) => void
  }

  interface Window extends WindowBinding {
    eventEmitter: EventTarget
  }
}

export {}
