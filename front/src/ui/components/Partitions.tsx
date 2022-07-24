import React from 'react'
import { useConsumer } from '../../hooks/useConsumer'
import { LoadContainer } from './LoadContainer'
import { Messages } from './Message'

interface IPartitionsProps {
  serverId: string
  topic: string
}

export function Partitions({ serverId, topic }: IPartitionsProps) {
  const [partitions, { loading, error }] = useConsumer(serverId, topic)

  return (
    <LoadContainer loading={loading} error={error}>
      {partitions.map((partition) => (
        <Partition key={partition} partition={partition} />
      ))}
    </LoadContainer>
  )
}

interface IPartitionProps {
  partition: number
}

export function Partition({ partition }: IPartitionProps) {
  return (
    <section>
      <h2>Partition {partition}</h2>
      <Messages partition={partition} />
    </section>
  )
}
