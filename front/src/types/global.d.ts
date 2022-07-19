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

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends WindowBinding {}
}

export {}
