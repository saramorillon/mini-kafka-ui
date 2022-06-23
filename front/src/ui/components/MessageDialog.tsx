import { IconX } from '@tabler/icons'
import React, { useEffect, useRef } from 'react'
import ReactJson from 'react-json-view'
import { IMessage } from '../../models/IMessage'

interface IMessageDialogProps {
  message?: IMessage
  onClose: () => void
}

export function MessageDialog({ message, onClose }: IMessageDialogProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const shouldOpen = Boolean(message)
    if (shouldOpen !== ref.current?.open) {
      if (shouldOpen) ref.current?.showModal()
      else ref.current?.close()
    }
  }, [message])

  return (
    <dialog ref={ref}>
      <header>
        <h1>Dialog header</h1>
        <button onClick={onClose}>
          <IconX />
        </button>
      </header>
      <section style={{ width: '70vw', height: '70vh', overflow: 'auto' }}>
        {message && (
          <ReactJson
            style={{ padding: '1rem 2rem' }}
            src={JSON.parse(message.value)}
            theme="ashes"
            enableClipboard={false}
            displayDataTypes={false}
            displayObjectSize={false}
            name={null}
          />
        )}
      </section>
      <footer>
        <button onClick={onClose}>Close</button>
      </footer>
    </dialog>
  )
}
