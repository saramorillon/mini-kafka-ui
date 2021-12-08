import { Kafka } from 'kafkajs'
import { useEffect, useMemo, useState } from 'react'
import { IServer } from '../models/IServer'

interface IAdmin {
  topics: string[]
  loading: boolean
}

export function useAdmin(server: IServer, open: boolean): IAdmin {
  const client = useMemo(() => new Kafka({ brokers: server.brokers }), [server])
  const admin = useMemo(() => client.admin(), [client])
  const [topics, setTopics] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    if (open)
      admin
        .connect()
        .then(() => {
          admin
            .listTopics()
            .then(setTopics)
            .then(() => admin.disconnect())
        })
        .finally(() => setLoading(false))
    else admin.disconnect().finally(() => setLoading(false))
  }, [open, admin])

  return { topics, loading }
}
