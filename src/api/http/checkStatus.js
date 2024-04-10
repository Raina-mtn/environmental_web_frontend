

import { Message } from 'element-ui'
// import router from '/@/router';
// import { PageEnum } from '/@/enums/pageEnum';

const error = Message.error

export function checkStatus(
  status,
  msg,
  errorMessageMode = 'message',
){
  let errMessage = ''

  switch (status) {
    case 400:
      errMessage = `${msg}`
      break
    case 401:
      errMessage = msg || '用户没有权限'
      break
    case 403:
      errMessage = '禁止访问'
      break
    // 404请求不存在
    case 404:
      errMessage = '接口404'
      break
    case 405:
      errMessage = '请求方法不允许'
      break
    case 500:
      errMessage = msg || '服务器错误'
      break
    case 501:
      errMessage = '网络错误'
      break
    case 502:
      errMessage = '网络错误'
      break
    case 503:
      errMessage = '网络错误'
      break
    case 504:
      errMessage = '网络错误'
      break
    case 505:
      errMessage = 'http版本错误'
      break
    default:
  }

  if (errMessage) {
    if (errorMessageMode === 'modal') {
      // createErrorModal({ title: t('sys.api.errorTip'), content: errMessage })
    } else if (errorMessageMode === 'message') {
      error(errMessage)
    }
  }
}
