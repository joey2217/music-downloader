import { message } from 'antd'

export function handleIPC () {
  window.electronAPI.onDownloadFinish((e, msg, type) => {
    if (type === 'success') {
      message.success(msg)
    } else {
      message.error(msg)
    }
  })
}
