/* 海康内部api*/
// import { apiRobotCameraCtrl } from "@/api/interface/index.js";
import { nanoid } from 'nanoid'

export default class HK {
  constructor({ip, port, username, password, type, robotId, producer}){
    this.ip = ip
    this.port = port
    this.username = username
    this.password = password

    // 相机的参数
    this.focusMode = 0  // 0 自动 1手动 2 半自动
    this.focusValue = 0 // 聚焦值
    this.zoomValue = 0 // 变倍值
    this.temperature = 0

    // 相机类型
    this.type = type  // visible 可见光 \ infrared 红外

    // 相机制造商
    this.producer = producer

    // 机器人id
    this.robotId = robotId

    // 播放器的id
    this.cameraId = nanoid(5)

    // 播放器id
    this.domId = this.cameraId

    this.debugInfo = `${this.type}@${this.cameraId}`
  }

  // 通信封装
  connect({params = {}, connectType, reTryCount = 0, maxTry = 3}){
    return new Promise((resolve, reject) => {
      let that = this
      // 设置超时自动结束方法
      let timer = setTimeout(() => {
        if(reTryCount > maxTry ){
          clearInterval(timer)
          console.error(`${that.debugInfo}: ${connectType} - timeout`)
          return reject(`${that.debugInfo}: ${connectType} - timeout`)
        }   
        console.log(`${that.debugInfo}: ${connectType} retry - .....${reTryCount}`)  
        reTryCount++
        this.connect({params,connectType, reTryCount})
      }, 3000);

      // 获取iframe
      let mapFrame = document.getElementById(this.domId);
      const iframeWin = mapFrame.contentWindow;
      iframeWin.postMessage(
        {
          connectType,
          ...params
        },
        "*"
      );

      function result(event) {
        let { cameraId, success } = event.data;
        if(cameraId === that.cameraId && event.data.connectType === connectType ){
          console.log('get result>>>', cameraId, event.data.connectType)
          window.removeEventListener('message', result);
          clearTimeout(timer)
          if(success){
            resolve(event.data)
            console.log(`${that.debugInfo}: ${connectType} - success `)
          }

          if(!success){
            reject(`${that.debugInfo}: ${connectType} - fail`)
            console.error(`${that.debugInfo}: ${connectType} - fail`)
          }
        }
      }
     
      window.addEventListener('message',result)
    })
  }

  // 通知摄像头实例化
  async init(){
    let params = {
      password: this.password,
      ip: this.ip,
      username: this.username,
      cameraId: this.cameraId,
      type: this.type
    }
    return this.connect({params, connectType: 'init' })
  }

  // 退出
  clickLogout = () => this.connect({connectType: 'clickLogout', maxTry: 1})

  // 开始预览
  clickStartRealPlay = ()=> this.connect({connectType: 'startRealPlay'})

  // 停止预览
  clickStopPlay = () => this.connect({connectType: 'stopRealPlay', maxTry: 1})
    
  // 开启语音对讲
  clickStartVoiceTalk = () => this.connect({connectType: 'clickStartVoiceTalk'})

  // 关闭语音对讲
  clickEndVoiceTalk= () => this.connect({connectType: 'clickEndVoiceTalk'})

  // 抓图
  async capturePic(name){
    let { url } = await this.connect({params: { name }, connectType: 'capturePic'})
    return url
  }

  // 抠图
  cuttingPartWindow({left,top,width, height}){
    this.connect({connectType: 'cuttingPartWindow', params: { left,top,width, height }})
  }

  // 获取抓图保存地址
  async getCapturePicPath(){
    let { path } = await this.connect({ connectType: 'getCapturePicPath'})
    return path
  }

  // 设置图片
  setCapturePicPath = (path) => this.connect({params: {path}, connectType: 'setCapturePicPath'})

  // 模式 SET_FOCUS_MODE 焦距 SET_FOCUS  倍率 SET_ZOOM  焦距和倍率 4
  async setCamera(actionType, value){
    try {
      let params = {}
      let valKey = null
      switch (actionType) {
        case 'SET_FOCUS_MODE':
          valKey = 'focusMode'
          break;
        case 'SET_FOCUS':
          valKey = 'focusValue'
          break;
        case 'SET_ZOOM':
          valKey = 'zoomValue'
          break;
      }
    
      params['cameraControlActionType'] = actionType
      params['robotId'] = this.robotId

      if(this.type == 'visible'){
        params['cameraType'] = 'VISIBLE_CAMERA'
      }else if(this.type == 'infrared'){
        params['cameraType'] = 'INFRARED_CAMERA'
      } else {
        throw `${this.debugInfo}: type value invalid - ${this.type}`
      }

      if(valKey){
        params[valKey] = value;
      }

      // 解析下 红外的聚焦
      if( this.type == 'infrared' && actionType == 'SET_FOCUS') {
        params['focusValue'] = lowHight2Int([value, this.temperature])
        console.log('红外设》》》》》》》》', params)
      }

      // await apiRobotCameraCtrl(params)
      if(valKey){
        Reflect.set(this, valKey, value)
      }

    } catch (error) {
      console.log('robot setCamera info error ', error)
    }
  }
}

function lowHight2Int(data) {
  let l = 0;
  l = data[0];
  l &= 0xffff;
  l |= (data[1] << 16);
  return l;
}