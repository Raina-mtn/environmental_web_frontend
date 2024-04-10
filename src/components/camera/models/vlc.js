/* eslint-disable no-unused-vars */
/* 海康内部api*/
import { nanoid } from "nanoid";

export default class Vlc {
  constructor({
    ip,
    port,
    username,
    password,
    type,
    robotId,
    producer,
    streamAddress,
  }) {
    this.ip = ip;
    this.port = port;
    this.username = username;
    this.password = password;
    this.streamAddress = streamAddress;

    // 相机的参数
    this.focusMode = 0; // 0 自动 1手动 2 半自动
    this.focusValue = 0; // 聚焦值
    this.zoomValue = 0; // 变倍值
    this.temperature = 0;

    // 相机类型
    this.type = type; // visible 可见光 \ infrared 红外

    // 相机制造商
    this.producer = producer;

    // 机器人id
    this.robotId = robotId;

    // 播放器的id
    this.cameraId = nanoid(5);

    // 播放器id
    this.domId = this.cameraId;

    this.debugInfo = `${this.type}@${this.cameraId}`;

    this.vlc = null;
  }

  // 通知摄像头实例化
  init = (vlc) => {
    this.vlc = vlc;
    vlc.playlist.add(this.streamAddress, "");
    // vlc.playlist.playItem(playlist);
  };

  // 退出
  clickLogout = () => {
    this.clickStopPlay();
    this.vlc = null;
  };

  // 开始预览
  clickStartRealPlay = async () => this.vlc.playlist.play();

  // 停止预览
  clickStopPlay = () => this.vlc.playlist.stop();

  // 开启语音对讲
  clickStartVoiceTalk = () => {};

  // 关闭语音对讲
  clickEndVoiceTalk = () => {};

  // 抓图
  capturePic = async (name) => true;

  // 获取抓图保存地址
  getCapturePicPath = async () => true;

  // 设置图片
  setCapturePicPath = async (path) => true;

  // 模式 SET_FOCUS_MODE 焦距 SET_FOCUS  倍率 SET_ZOOM  焦距和倍率 4
  async setCamera(actionType, value) {
    try {
      let params = {};
      let valKey = null;
      switch (actionType) {
        case "SET_FOCUS_MODE":
          valKey = "focusMode";
          break;
        case "SET_FOCUS":
          valKey = "focusValue";
          break;
        case "SET_ZOOM":
          valKey = "zoomValue";
          break;
      }

      params["cameraControlActionType"] = actionType;
      params["robotId"] = this.robotId;

      if (this.type == "visible") {
        params["cameraType"] = "VISIBLE_CAMERA";
      } else if (this.type == "infrared") {
        params["cameraType"] = "INFRARED_CAMERA";
      } else {
        throw `${this.debugInfo}: type value invalid - ${this.type}`;
      }

      if (valKey) {
        params[valKey] = value;
      }

      // 解析下 红外的聚焦
      if (this.type == "infrared" && actionType == "SET_FOCUS") {
        params["focusValue"] = lowHight2Int([value, this.temperature]);
        console.log("红外设》》》》》》》》", params);
      }

      if (valKey) {
        Reflect.set(this, valKey, value);
      }
    } catch (error) {
      console.log("robot setCamera info error ", error);
    }
  }
}

function lowHight2Int(data) {
  let l = 0;
  l = data[0];
  l &= 0xffff;
  l |= data[1] << 16;
  return l;
}
