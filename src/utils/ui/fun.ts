// runDelDictData.ts
/**
 * 一步式调用：
 * 传入“已开始执行的 Promise”或“返回 Promise 的函数”，并显示一条常驻的加载消息；
 * 当 Promise 结束时（无论成功或失败）自动关闭该消息；
 * 返回原始 Promise，方便在外部 .then() / .catch() 自行处理成功/失败提示。
 *
 * 用法示例：
 *   runDelDictData(DelDictData(delIds), '正在删除 …')
 *     .then(() => { showMessageSuccess('删除成功'); })
 *     .catch(() => { showMessageError('删除失败'); });
 *
 * 也支持传入 thunk（函数），在内部触发执行：
 *   runDelDictData(() => DelDictData(delIds), '正在删除 …')
 *     .then(...).catch(...);
 */

import type { MessageHandler } from 'element-plus'
import { ElMessage } from 'element-plus'

type Thunk<T> = () => Promise<T>

/**
 * delMsgLoading
 * @param promiseOrThunk 可传：已创建的 Promise 或 返回 Promise 的函数
 * @param loadingText 加载提示文案
 */
export function delMsgLoading<T>(
  promiseOrThunk: Promise<T> | Thunk<T>,
  loadingText: string,
): Promise<T> {
  const loadingMsg: MessageHandler = ElMessage({
    type: 'info',
    message: loadingText,
    duration: 0,
    showClose: false,
    grouping: false,
  })
  const p = typeof promiseOrThunk === 'function' ? (promiseOrThunk as Thunk<T>)() : (promiseOrThunk as Promise<T>)
  return p.finally(() => {
    loadingMsg?.close()
  })
}
