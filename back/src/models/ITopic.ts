export interface ITopic {
  name: string
  offsets: {
    partition: number
    offset: string
    high: string
    low: string
  }[]
}
