import { DefaultButton, Dialog, DialogType, PrimaryButton, Stack, TextField } from '@fluentui/react'
import React, { FormEvent, useCallback, useContext, useEffect, useState } from 'react'
import { ConfigContext } from '../../contexts/ConfigContext'
import { IGroup } from '../../models/IGroup'

interface IGroupProps {
  connection?: IGroup
  onDismiss: () => void
}

export function Group({ connection: group, onDismiss }: IGroupProps): JSX.Element {
  const { dispatch } = useContext(ConfigContext)

  const [name, setName] = useState<string>()

  useEffect(() => {
    setName(group?.name)
  }, [group])

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      dispatch({ type: 'save', key: group?.key, connection: { name } })
      onDismiss()
    },
    [onDismiss, dispatch, group, name]
  )

  return (
    <Dialog
      hidden={false}
      dialogContentProps={{ type: DialogType.largeHeader, title: group ? group.name : 'New group' }}
      minWidth="90%"
    >
      <form onSubmit={onSubmit}>
        <Stack tokens={{ padding: '1rem', childrenGap: '1rem' }}>
          <TextField label="Group name" required value={name || ''} onChange={(e, value) => setName(value)} />
          <Stack.Item align="end">
            <Stack horizontal tokens={{ childrenGap: '2rem' }}>
              <DefaultButton text="Cancel" type="button" onClick={onDismiss} />
              <PrimaryButton text="Save" type="submit" />
            </Stack>
          </Stack.Item>
        </Stack>
      </form>
    </Dialog>
  )
}
