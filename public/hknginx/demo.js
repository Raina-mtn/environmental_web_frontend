// 初始化插件

// 全局保存当前选中窗口
var g_iWndIndex = 0; //可以不用设置这个变量，有窗口参数的接口中，不用传值，开发包会默认使用当前选择窗口
var version = "websdk3.220191023";
$(function () {
  // 检查插件是否已经安装过
  var iRet = window.WebVideoCtrl.I_CheckPluginInstall();
  if (-1 == iRet) {
    alert("您还未安装过插件，双击开发包目录里的WebComponentsKit.exe安装！");
    return;
  }

});

// I_DestroyWorker
// I_CloseWin
// 初始化
function initPlugin(iWndowType=1){
  // 初始化插件参数及插入插件
  WebVideoCtrl.I_InitPlugin(500, 220, {
    bWndFull: true, //是否支持单窗口双击全屏，默认支持 true:支持 false:不支持
    iPackageType: 2,
    //szColorProperty:"plugin-background:0000ff; sub-background:0000ff; sub-border:00ffff; sub-border-select:0000ff",   //2:PS 11:MP4
    iWndowType: 1,
    bNoPlugin: true,
    cbSelWnd: function (xmlDoc) {
      g_iWndIndex = parseInt($(xmlDoc).find("SelectWnd").eq(0).text(), 10);
      var szInfo = "当前选择的窗口编号：" + g_iWndIndex;
    },
    cbInitPluginComplete: function () {
      WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin");
      changeWndNum(iWndowType); // 2*2 窗格

      // 检查插件是否最新
      if (-1 == WebVideoCtrl.I_CheckPluginVersion()) {
        alert(
          "检测到新的插件版本，双击开发包目录里的WebComponentsKit.exe升级！"
        );
        return;
      }
    },
  });
}

// 全屏
function clickFullScreen() {
  WebVideoCtrl.I_FullScreen(true);
}

// 显示操作信息
function showOPInfo(szInfo, status, xmlDoc) {
  console.log(szInfo);
}

// 窗口分割数
function changeWndNum(iType) {
  iType = parseInt(iType, 10);
  WebVideoCtrl.I_ChangeWndNum(iType);
}

// 登录
function clickLogin({ ip, port, username, password }, index) {
  return new Promise((resolve, reject) => {
    if ("" == ip || "" == port) {
      return;
    }

    var szDeviceIdentify = ip + "_" + port;

    var iRet = WebVideoCtrl.I_Login(ip, 1, port, username, password, {
      success: function (xmlDoc) {
        showOPInfo(szDeviceIdentify + " 登录成功！");
        resolve(1)
      },
      error: function (status, xmlDoc) {
        showOPInfo(szDeviceIdentify + " 登录失败！", status, xmlDoc);
        reject("失败");
      },
    });
    if (-1 == iRet) {
      showOPInfo(szDeviceIdentify + " 已登录过！");
      resolve(-1)
    }
  });
}

// 退出
function clickLogout({ip}) {
  return new Promise((reslove, reject)=>{
    
  var szInfo = "";

  if (null == ip) {
    return;
  }

  var iRet = WebVideoCtrl.I_Logout(ip);
  if (0 == iRet) {
    szInfo = "退出成功！";
    reslove()
  } else {
    szInfo = "退出失败！";
    reject()
  }
  showOPInfo(ip + " " + szInfo);
  })
}

// 开始预览
function clickStartRealPlay({ ip, port, iChannelID, win_index }) {
  return new Promise((reslove, reject) => {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(win_index),
      szDeviceIdentify = `${ip}_${port}`,
      bZeroChannel = false,
      szInfo = "";

    if (null == szDeviceIdentify) {
      return;
    }
    var startRealPlay = function () {
      const ret = WebVideoCtrl.I_StartRealPlay(szDeviceIdentify, {
        iWndIndex: win_index, // 播放窗口
        iRtspPort: 554,
        iStreamType: 2, // 子码流 写死
        iChannelID: iChannelID,
        bZeroChannel: bZeroChannel,
        success: function () {
          szInfo = "开始预览成功！";
          showOPInfo(szDeviceIdentify + " " + szInfo);
          reslove();
        },
        error: function (status, xmlDoc) {
          if (403 === status) {
            szInfo = "设备不支持Websocket取流！";
          } else {
            szInfo = "开始预览失败！";
          }
          showOPInfo(szDeviceIdentify + " " + szInfo);
          reject();
        },
      });
    };

    if (oWndInfo != null) {
        console.log('已经在播放了');
      // 已经在播放了，先停止
      WebVideoCtrl.I_Stop({
        iWndIndex: win_index,
        success: function () {
          startRealPlay();
        },
      });
    } else {
      startRealPlay();
    }
  });
}
// 停止预览
function clickStopRealPlay(win_index) {
    return new Promise((resolve, reject)=>{
  var oWndInfo = WebVideoCtrl.I_GetWindowStatus(win_index),
    szInfo = "";

  if (oWndInfo != null) {
    WebVideoCtrl.I_Stop({
      iWndIndex: win_index,
      success: function () {
        szInfo = "停止预览成功！";
        showOPInfo(oWndInfo.szDeviceIdentify + " " + szInfo);
        resolve()
      },
      error: function () {
        szInfo = "停止预览失败！";
        showOPInfo(oWndInfo.szDeviceIdentify + " " + szInfo);
        reject()
      },
    });
  }

    })
}

//判断是否在线
    let timer = null
function judgeOnline(camera={}, win_index=0){
  return new Promise((reslove, reject) => {
    const szDeviceIdentify = `${camera.ip}_${camera.port}`
    const szUrl = 'ISAPI/Security/sessionHeartbeat'
    let flag = false // 是否成功
    try {
      WebVideoCtrl.I_SendHTTPRequest(szDeviceIdentify,szUrl,{
        type: "PUT",
        success: function(){
          flag = true
          reslove('online')
        },
        error: function(code){
          flag = true
          reject('error')
        }
      });
    } catch (error) {
      flag = true
      reject('error')
    }
    if(!timer){
      timer = setTimeout(async ()=>{
        console.log('进入setTimeOut');
        if(!flag){ // 未得到响应
          reject('no response')
        }
      },2000)
    }else{
      clearTimeout(timer)
      timer = null
    }
  })
}

// 重连
function reconnect({ip,port}) {
  return new Promise((resolve, reject)=>{
    const szDeviceIdentify = `${ip}_${port}`
    WebVideoCtrl.I_Reconnect(szDeviceIdentify, {
      success: function (xmlDoc) {
        resolve(1)
      },
      error: function (status, xmlDoc) {
          if (401 == status) {// 无插件方案，重启后session已失效，程序执行登出，从已登录设备中删除
              clickLogout({ip}).then(res=>{
                console.log('退出重连成功');
                reconnect({ip,port})
                resolve(1)
              }).catch(()=>{
                reconnect({ip,port})
              })
          } else {
              setTimeout(function () {reconnect({ip,port});}, 2000);
          }
      }
  });
  })
 
}