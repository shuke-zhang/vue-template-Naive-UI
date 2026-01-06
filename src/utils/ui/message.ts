import type { MessageOptions, MessageType } from 'naive-ui'
import { createDiscreteApi } from 'naive-ui'

type MessageOptionsWithoutTypeAndMessage = Omit<MessageOptions, 'type' | 'message'>
const { message: _message } = createDiscreteApi(['message'])
export function createBaseMessage(type: MessageType) {
  const defaultOptions: MessageOptionsWithoutTypeAndMessage = {
    duration: 2000,
    closable: true,
  }
  return (message: string, options: MessageOptionsWithoutTypeAndMessage = {}) => {
    return new Promise((resolve) => {
      _message.create(message, {
        type,
        ...defaultOptions,
        ...options,
        onClose: () => {
          resolve(true)
        },
      })
      console.log('createBaseMessage')
    })
  }
}
