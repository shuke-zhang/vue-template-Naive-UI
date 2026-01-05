import type { MessageOptions, MessageOptionsWithType } from 'element-plus'
import { Loading } from '@element-plus/icons-vue'

type MessageOptionsType = Required<MessageOptions>['type']
type MessageOptionsWithoutTypeAndMessage = Omit<MessageOptions, 'type' | 'message'>

export function createBaseLoadingMessage(type: MessageOptionsType) {
  const defaultOptions: MessageOptionsWithoutTypeAndMessage = {
    duration: 2000,
    showClose: true,
  }
  return (message: string, options: MessageOptionsWithType = {}) => {
    return new Promise((resolve) => {
      ElMessage({
        message,
        showClose: true,
        grouping: false,
        type,
        icon: h(ElIcon, { class: 'is-loading' }, () => h(markRaw(Loading))),
        ...defaultOptions,
        ...options,
        onClose: () => {
          resolve(true)
        },
      })
    })
  }
}
