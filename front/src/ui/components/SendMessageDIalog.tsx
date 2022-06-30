import { Send, X } from '@styled-icons/feather'
import React, { FormEvent, useCallback, useRef, useState } from 'react'
import { sendMessage } from '../../services/message'

interface ISendMessageDialogProps {
  serverKey: string
  topic: string
}

export function SendMessageDialog({ serverKey, topic }: ISendMessageDialogProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const [value, setValue] = useState('')

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      void sendMessage(serverKey, topic, value).then(() => console.log('coucou'))
    },
    [serverKey, topic, value]
  )

  return (
    <>
      <button onClick={() => ref.current?.showModal()}>
        <Send /> Send a message
      </button>
      <form onSubmit={onSubmit}>
        <dialog ref={ref}>
          <header>
            <h1>Send a message</h1>
            <button type="button" onClick={() => ref.current?.close()}>
              <X />
            </button>
          </header>
          <main>
            <label>
              Message
              <textarea style={{ height: 200 }} value={value} onChange={(e) => setValue(e.target.value)}></textarea>
            </label>
          </main>
          <footer>
            <button type="button" onClick={() => ref.current?.close()}>
              Cancel
            </button>
            <button>Send</button>
          </footer>
        </dialog>
      </form>
    </>
  )
}
