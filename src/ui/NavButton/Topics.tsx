import { ListItem, ListItemButton, ListItemText, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { v4 } from 'uuid'
import { ConfigContext } from '../../contexts/ConfigContext'
import { IServer } from '../../models/IServer'

interface ITopicsProps {
  server: IServer
  topics: string[]
}

export function Topics({ server, topics }: ITopicsProps): JSX.Element {
  const { dispatch } = useContext(ConfigContext)
  const [filteredTopics, setFilteredTopics] = useState<string[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (search.length >= 3) {
      setFilteredTopics(
        topics.filter((topic) => topic.toLowerCase().includes(search.toLowerCase())).sort((a, b) => a.localeCompare(b))
      )
    }
  }, [search, topics])

  return (
    <>
      <ListItem>
        <TextField
          placeholder="Search"
          variant="standard"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </ListItem>
      {filteredTopics.map((topic) => (
        <ListItemButton
          key={topic}
          title={topic}
          sx={{ py: 0 }}
          onClick={() => dispatch({ type: 'open', item: { ...server, key: v4(), topic } })}
        >
          <ListItemText primaryTypographyProps={{ fontSize: '0.7rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {topic}
          </ListItemText>
        </ListItemButton>
      ))}
    </>
  )
}
