import { ActionButton, ContextualMenu, IContextualMenuItem } from '@fluentui/react'
import React, { PropsWithChildren, useMemo, useRef, useState } from 'react'

interface INavButtonProps {
  icon?: string
  onOpen: () => void
  onEdit: () => void
  onDelete: () => void
  onCopy: () => void
}

export function NavButton({
  icon,
  onOpen,
  onEdit,
  onDelete,
  onCopy,
  children,
}: PropsWithChildren<INavButtonProps>): JSX.Element {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const menuItems = useMemo<IContextualMenuItem[]>(
    () => [
      { key: 'edit', text: 'Edit', onClick: onEdit },
      { key: 'delete', text: 'Delete', onClick: onDelete },
      { key: 'copy', text: 'Copy', onClick: onCopy },
    ],
    [onEdit, onDelete, onCopy]
  )

  return (
    <>
      <ActionButton iconProps={{ iconName: icon }} onClick={onOpen} onContextMenu={() => setOpen(true)}>
        <span ref={ref}>{children}</span>
      </ActionButton>
      <ContextualMenu
        items={menuItems}
        hidden={!open}
        target={ref}
        onItemClick={() => setOpen(false)}
        onDismiss={() => setOpen(false)}
      />
    </>
  )
}
