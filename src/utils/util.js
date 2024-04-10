import { isObject} from 'lodash-es'
const { VUE_APP_API_BASE} = process.env
import { Message } from 'element-ui'
export const clearEmptySearch = (params) => {
  const obj = {}
  Object.keys(params).forEach(key => {
    const value = params[key]
    if (typeof value === 'string') {
      if (value) {
        obj[key] = value
      }
    } else if (Array.isArray(value)) {
      if (value.length) {
        obj[key] = value
      }
    } else if (value !== null){
      obj[key] = value
    }
  })
  return obj
}
/**
 * 数组转树
 * @param {Array} list
 * @param {string} pid
 * @param {string} id
 */
export function arrayToTree(list = [], pid = 'parentId', id = 'id') {
  const data = JSON.parse(JSON.stringify(list))
  const result = []
  if (!Array.isArray(data)) {
    return result
  }
  data.forEach(item => {
    delete item.children
  })
  const map = {}
  data.forEach(item => {
    map[item[id]] = item
  })
  data.forEach(item => {
    const parent = map[item[pid]]
    if (parent) {
      (parent.children || (parent.children = [])).push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

/**
   * 树转数组
   * @param {Array} list
   * @param {String} children
   * @param {String} id
   */
export function treeToArray(list = [], children = 'children') {
  const stack = JSON.parse(JSON.stringify(list))
  const data = []
  while (stack.length !== 0) {
    const pop = stack.pop()
    const popChildren = pop[children]
    delete pop[children]
    data.push(pop)
    if (popChildren) {
      for (let i = popChildren.length - 1; i >= 0; i--) {
        stack.push(popChildren[i])
      }
    }
  }
  return data
}

// 深度合并
export function deepMerge(src, target){
  let key
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key])
  }
  return src
}

const hexList = []
for (let i = 0; i <= 15; i++) {
  hexList[i] = i.toString(16)
}
// 拼接参数到url上
export function setObjToUrlParams(baseUrl, obj) {
  let parameters = ''
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&'
  }
  parameters = parameters.replace(/&$/, '')
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters
}



/**
 * 
 * @param {blob} data 返回字节流
 * @param {String} fileName 下载文件名
 */
export function downloadFile(data, fileName, type){
  const blob = new Blob([data],{type} );
  const downlodUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = downlodUrl
  link.download = fileName
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
export function exportFile({url, params,token,name}){
  const xhr = new XMLHttpRequest()
  xhr.open('GET', `${VUE_APP_API_BASE}${url}?id=${params.id}`)
  xhr.responseType = 'blob'
  xhr.onload = function () {
    if(!xhr.getResponseHeader("Content-Disposition")){
      return Message.error('下载导出文件异常')
    }
    let fileName, fileType
    // const fileType = xhr.getResponseHeader("content-type")
    // const fileName = xhr.getResponseHeader("Content-Disposition").split('filename=')[1]
    if(navigator.userAgent.indexOf("Firefox")>0){ // firefox取不到响应数据的文件名及类型
      fileName = `${name}.pdf`
      fileType = 'pdf'
    }else{
      fileName = decodeURI(xhr.getResponseHeader("Content-Disposition").split(";")[1].split("filename=")[1]);
      fileType = xhr.getResponseHeader("content-type")
    }
    downloadFile(xhr.response,  fileName, fileType)
  }
  // 传递 token
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send()
  // xhr.setRequestHeader('token', token);
  // xhr.send(JSON.stringify(params));
}


//度°分′秒″转度
export function ToDigital(strDu) {
  let du = strDu.split("°")[0];
  let fen = strDu.split("°")[1].split("'")[0];
  let miao = strDu.split("°")[1].split("'")[1].split('"')[0];
  let res =Math.abs(du) +(Math.abs(fen)/60 + Math.abs(miao)/3600);
  res=parseFloat(res).toFixed(6);
  return res;
}
