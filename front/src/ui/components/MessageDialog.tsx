import { useCopy } from '@saramorillon/hooks'
import { Clipboard, X } from '@styled-icons/feather'
import React, { useEffect, useRef } from 'react'
import ReactJson from 'react-json-view'
import { IMessage } from '../../models/IMessage'

interface IMessageDialogProps {
  message?: IMessage
  onClose: () => void
}

export function MessageDialog({ message, onClose }: IMessageDialogProps) {
  const [authorized, , copy] = useCopy()
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
      {message && (
        <>
          <header>
            <h1>
              Partition {message.partition} - Offset {message.offset}
            </h1>
            <button onClick={onClose}>
              <X />
            </button>
          </header>
          <section style={{ width: '70vw', maxHeight: '70vh', overflow: 'auto' }}>
            <ReactJson
              style={{ padding: '1rem 2rem' }}
              src={JSON.parse(message.value)}
              theme="ashes"
              enableClipboard={false}
              displayDataTypes={false}
              displayObjectSize={false}
              name={null}
            />
          </section>
          <footer>
            <button onClick={onClose}>Close</button>
            {authorized && (
              <button onClick={() => copy(message.value)}>
                <Clipboard /> Copy
              </button>
            )}
          </footer>
        </>
      )}
    </dialog>
  )
}
