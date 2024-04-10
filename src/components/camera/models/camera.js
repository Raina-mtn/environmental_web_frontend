
import HK from "@/components/camera/models/hkApi.js";
import Vlc from "@/components/camera/models/vlc.js"
export default class Camera {
  static getCamera(options, robotId) {
    let cameraInstance = null;
    let { producer } = options;
    switch (producer) {
      case 'HK': {
        let { password, ip, username, type } = options;
        cameraInstance = new HK({
          password,
          ip,
          username,
          port: 80,
          robotId,
          type,
          producer
        });
      }
        break;
      case 'FZ': {
        let { streamAddress } = options;
        cameraInstance = new Vlc({
          robotId,
          producer,
          streamAddress
        });
      }
        break;
      default: {
        let { password, ip, username, type } = options;
        cameraInstance = new HK({
          password,
          ip,
          username,
          port: 80,
          robotId,
          type,
          producer: 'HK'
        });
      }
        break;
    }
    return cameraInstance;
  }
}
