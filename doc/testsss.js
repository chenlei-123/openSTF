/**
 * Created by weibin on 2018/4/11.
 */
var jsons = {
  "success":"true",
  "devices":[{
  "abi": "arm64-v8a",
  "airplaneMode": "false",
  "battery": {
    "health": "good",
    "level": 69,
    "scale": 100,
    "source": "usb",
    "status": "charging",
    "temp": 29.3,
    "voltage": 4.018
  },
  "browser": {
    "apps": [{
      "id": "com.android.browser/.RealBrowserActivity",
      "name": "Browser",
      "selected": "true",
      "system": "true",
      "type": "android-browser",
      "developer": "Google Inc."
    }],
    "selected": "true"
  },
  "channel": "mcsjNRMHlaW+aZWOpJSaVuKWpsI=",
  "cpuPlatform": "mt6755",
  "createdAt": "2018-04-11T07:55:56.519Z",
  "display": {
    "density": 3,
    "fps": 59.52000045776367,
    "height": 1920,
    "id": 0,
    "rotation": 0,
    "secure": "true",
    "size": 5.498869895935059,
    "url": "ws://localhost:7428",
    "width": 1080,
    "xdpi": 403.4110107421875,
    "ydpi": 399.73699951171875
  },
  "manufacturer": "OPPO",
  "model": " R9m",
  "network": {
    "connected": "true",
    "failover": "false",
    "roaming": "false",
    "subtype": "",
    "type": "WIFI"
  },
  "openGLESVersion": "3.0",
  "operator": ",",
  "owner": null,
  "phone": {
    "iccid": null,
    "imei": "861744035772715",
    "imsi": null,
    "network": "UNKNOWN",
    "phoneNumber": null
  },
  "platform": "Android",
  "presenceChangedAt": "2018-04-11T09:42:07.888Z",
  "present": "false",
  "product": "R9m",
  "provider": {
    "channel": "aul8qYf+R9OchJq0YK4NSg==",
    "name": "weibindeMacBook-Pro.local"
  },
  "ready": "true",
  "remoteConnect": "false",
  "remoteConnectUrl": null,
  "reverseForwards": [],
  "sdk": "22",
  "serial": "AM6HCUIVJBPVYLIN",
  "status": 3,
  "statusChangedAt": "2018-04-11T08:04:13.803Z",
  "usage": null,
  "usageChangedAt": "2018-04-11T07:59:25.323Z",
  "version": "5.1",
  "using": "false"
}, {
  "abi": "armeabi-v7a",
  "airplaneMode": "false",
  "battery": {
    "health": "good",
    "level": 91,
    "scale": 100,
    "source": "ac",
    "status": "charging",
    "temp": 32.9,
    "voltage": 4.314
  },
  "browser": {
    "apps": [],
    "selected": "true"
  },
  "channel": "OMILDftZ0KjBIh9QL0Qj8OsbkgQ=",
  "cpuPlatform": "msm8974",
  "createdAt": "2018-04-03T09:51:55.117Z",
  "display": {
    "density": 3,
    "fps": 60,
    "height": 1920,
    "id": 0,
    "rotation": 0,
    "secure": "true",
    "size": 5.464510440826416,
    "url": "ws://localhost:7436",
    "width": 1080,
    "xdpi": 403.4110107421875,
    "ydpi": 403.0409851074219
  },
  "manufacturer": "ZUK",
  "model": " Z1",
  "network": {
    "connected": "true",
    "failover": "false",
    "roaming": "false",
    "subtype": "",
    "type": "WIFI"
  },
  "openGLESVersion": "3.0",
  "operator": ",中国移动",
  "owner": null,
  "phone": {
    "iccid": "898600210115f0045585",
    "imei": "867695029160115",
    "imsi": "460023107471247",
    "network": "LTE",
    "phoneNumber": "+8615011277929"
  },
  "platform": "Android",
  "presenceChangedAt": "2018-04-11T09:42:41.677Z",
  "present": "false",
  "product": "k9",
  "provider": {
    "channel": "aul8qYf+R9OchJq0YK4NSg==",
    "name": "weibindeMacBook-Pro.local"
  },
  "ready": "true",
  "remoteConnect": "false",
  "remoteConnectUrl": null,
  "reverseForwards": [],
  "sdk": "23",
  "serial": "43f6fe92",
  "status": 3,
  "statusChangedAt": "2018-04-11T09:41:31.107Z",
  "usage": null,
  "usageChangedAt": "2018-04-11T07:45:24.000Z",
  "version": "6.0.1",
  "using": "false"
}]
}

console.log(jsons.devices[0].serial)
