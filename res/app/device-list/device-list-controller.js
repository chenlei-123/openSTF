var QueryParser = require('./util/query-parser')
var passportJson = require('./passport')

module.exports = function DeviceListCtrl($scope, DeviceService, DeviceColumnService, GroupService, ControlService, SettingsService, $location, $http, $upload) {
  $scope.tracker = DeviceService.trackAll($scope)
  $scope.control = ControlService.create($scope.tracker.devices, '*ALL')
  $scope.shellModel = false //shell弹框控制
  $scope.unInstallModel = false //卸载弹框控制
  $scope.columnDefinitions = DeviceColumnService
  // $scope.toDoShell = ''
  $scope.toUninstall = ''

  $scope.startPopWindowMonitorModel = false//启动弹窗监控控制
  $scope.stopPopWindowMonitorModel = false//关闭弹窗监控控制

  $scope.smartTestModel = false//启动遍历测试按钮


  var defaultColumns = [{
    name: 'install',
    selected: true
  },
    {
      name: 'state',
      selected: true
    }, {
      name: 'model',
      selected: true
    }, {
      name: 'name',
      selected: true
    }, {
      name: 'serial',
      selected: false
    }, {
      name: 'operator',
      selected: true
    }, {
      name: 'releasedAt',
      selected: true
    }, {
      name: 'version',
      selected: true
    }, {
      name: 'network',
      selected: false
    }, {
      name: 'display',
      selected: false
    }, {
      name: 'manufacturer',
      selected: false
    }, {
      name: 'sdk',
      selected: false
    }, {
      name: 'abi',
      selected: false
    }, {
      name: 'cpuPlatform',
      selected: false
    }, {
      name: 'openGLESVersion',
      selected: false
    }, {
      name: 'browser',
      selected: false
    }, {
      name: 'phone',
      selected: false
    }, {
      name: 'imei',
      selected: false
    }, {
      name: 'imsi',
      selected: false
    }, {
      name: 'iccid',
      selected: false
    }, {
      name: 'batteryHealth',
      selected: false
    }, {
      name: 'batterySource',
      selected: false
    }, {
      name: 'batteryStatus',
      selected: false
    }, {
      name: 'batteryLevel',
      selected: false
    }, {
      name: 'batteryTemp',
      selected: false
    }, {
      name: 'provider',
      selected: true
    }, {
      name: 'notes',
      selected: true
    }, {
      name: 'owner',
      selected: true
    }
  ]

  $scope.columns = defaultColumns

  SettingsService.bind($scope, {
    target: 'columns',
    source: 'deviceListColumns'
  })

  var defaultSort = {
    fixed: [{
      name: 'state',
      order: 'asc'
    }],
    user: [{
      name: 'name',
      order: 'asc'
    }]
  }

  $scope.sort = defaultSort

  SettingsService.bind($scope, {
    target: 'sort',
    source: 'deviceListSort'
  })

  $scope.filter = []

  $scope.activeTabs = {
    icons: true,
    details: false
  }

  SettingsService.bind($scope, {
    target: 'activeTabs',
    source: 'deviceListActiveTabs'
  })

  $scope.toggle = function(device) {
    if (device.using) {
      $scope.kick(device)
    }
    else {
      $location.path('/control/' + device.serial)
    }
  }

  $scope.invite = function(device) {
    return GroupService.invite(device).then(function() {
      $scope.$digest()
    })
  }

  $scope.applyFilter = function(query) {
    $scope.filter = QueryParser.parse(query)
  }

  $scope.search = {
    deviceFilter: '',
    focusElement: false
  }

  $scope.focusSearch = function() {
    if (!$scope.basicMode) {
      $scope.search.focusElement = true
    }
  }

  $scope.reset = function() {
    $scope.search.deviceFilter = ''
    $scope.filter = []
    $scope.sort = defaultSort
    $scope.columns = defaultColumns
  }

  $scope.showLunchShell = function() { //控制shell脚本模态框
    $scope.shellModel = true
  }
  $scope.closeLunchShell = function() {
    // $scope.toDoShell = ''
    $scope.shellModel = false
  }

  $scope.showUnInstall = function() { //控制卸载模态框
    $scope.unInstallModel = true
  }
  $scope.closeUnInstall = function() {
    $scope.toUninstall = ''
    $scope.unInstallModel = false
  }

  $scope.showStartPopWindowMonitor = function() {
    $scope.startPopWindowMonitorModel = true
  }
  $scope.hideStartPopWindowMonitor = function() {
    $scope.startPopWindowMonitorModel = false
  }

  $scope.showStopPopWindowMonitor = function() {
    $scope.stopPopWindowMonitorModel = true
  }

  $scope.hideStopPopWindowMonitor = function() {
    $scope.stopPopWindowMonitorModel = false
  }

  $scope.showSmartTest = function() {
    $scope.smartTestModel = true
  }

  $scope.hideSmartTest = function() {
    $scope.smartTestModel = false
  }


  $scope.getCurrentDevices = function() { //获取选中的设备列表
    let currentDevices = []
    var cbList = document.getElementsByClassName('installCheckbox')
    var devices = this.tracker.devices
    console.log(devices)
    devices.forEach(function(device) {
      for (var i = 0; i < cbList.length; i++) {
        var cb = cbList[i]
        var serial = cb.getAttribute('serial')
        if (cb.checked && serial === device.serial) {
          currentDevices.push(device)
        }
      }
    })
    return currentDevices
  }


  $scope.lunchShell = function() { //shell执行

    var packageName = "com.rrh.jdb"

    var tester = ""
    var serialNumber = ""

    $http.get("/api/v1/user").then(function(res) {
      console.log("get user ------- start")
      tester = res.data.user.name.toString()
      console.log(tester)
      console.log(packageName)
      console.log("get user ------- end")

      var startTravelUrl = "http://100.66.130.108:8081/compatibility/startCompatibilityTest?tester="+tester+"&packageName="+packageName
      $http.get(startTravelUrl).then(function(res) {
        console.log("serialNumber-------------start")
        serialNumber = res.data.data.serialNumber.toString()
        console.log(serialNumber)
        console.log("serialNumber-------------end")
      })
    })



    $scope.shellModel = false
    var ShellDevices = this.getCurrentDevices()
    if (!ShellDevices.length) {
      alert('请选择至少一台设备')
    }
    ShellDevices.forEach(function(ShellDevices, index) {
      var control = ControlService.create(ShellDevices, ShellDevices.channel)
      let todoShell = 'am instrument -w -r -e phone ' + passportJson[index].phone + ' -e password ' + passportJson[index].password + '  -e debug false -e class com.rrh.testapp.TestClass#testCase com.rrh.testapp.test/android.support.test.runner.AndroidJUnitRunner'
      control.shell(todoShell)
        .progressed(function(result) {
          console.log(result)
        })
        .then(function(result) {
          console.log(result)

          let count = result.data.length

          var deviceName = result.device.model.toString()
          var androidVersion = result.device.version.toString()
          var deviceSerial = result.device.serial.toString()
          var content = result.lastData.toString()

          var status = "FAIL"
          var success = "OK (1 test)"
          if(content.indexOf(success)>=0){
            status = "SUCCESS"
          }
          console.log("print ----- start")
          console.log(serialNumber)
          console.log(deviceName)
          console.log(deviceSerial)
          console.log(androidVersion)
          console.log(status)
          console.log(content)
          console.log("print ----- stop")

          var stopGetUrl = "http://100.66.130.108:8081/compatibility/stopCompatibilityTest?serialNumber="+serialNumber+"&deviceName="+deviceName+"&deviceSerial="+deviceSerial+"&androidVersion="+androidVersion+"&status="+status+"&content="+content
          console.log(stopGetUrl)
          $http.get(stopGetUrl)
            .then(function(res) {
              console.log('res')
              console.log(res)
            })
            .catch(function(err) {
              console.log('err')
              console.log(err)
            })
          alert('设备' + result.device.model + ' 执行完成\n' + result.data[count - 1])
        })
    })
  }


  $scope.startSmartTest = function() {


    $scope.smartTestModel = false
    var ShellDevices = this.getCurrentDevices()
    if (!ShellDevices.length) {
      alert('请选择至少一台设备')
      return
    }

    var packageName = "com.rrh.jdb.debug"

    var tester = ""
    var serialNumber = ""

    $http.get("/api/v1/user").then(function(res) {
      console.log("get user ------- start")
      tester = res.data.user.name.toString()
      console.log(tester)
      console.log(packageName)
      console.log("get user ------- end")

      var startTravelUrl = "http://100.66.130.108:8081/travel/startTravelTest?tester="+tester+"&packageName="+packageName
      $http.get(startTravelUrl).then(function(res) {
        console.log("serialNumber-------------start")
        serialNumber = res.data.data.serialNumber.toString()
        console.log(serialNumber)
        console.log("serialNumber-------------end")
      })
    })

    ShellDevices.forEach(function(ShellDevices, index) {
      var control = ControlService.create(ShellDevices, ShellDevices.channel)
      let todoShell = 'am instrument -w -r -e etMobile ' + passportJson[index].phone + ' -e etPassword ' + passportJson[index].password + ' -e debug false -e class com.rrh.jdb.Smart com.rrh.jdb.debug.test/android.support.test.runner.AndroidJUnitRunner'
      control.shell(todoShell)
        .progressed(function(result) {
          console.log('process ------ ')
          console.log(result)
        })
        .then(function(result) {
          console.log('stop ------ ')
          console.log(result)

          var deviceName = result.device.model.toString()
          var androidVersion = result.device.version.toString()
          var deviceSerial = result.device.serial.toString()

          var stopTravelUrl = "http://100.66.130.108:8081/travel/stopTravelTest?serialNumber="+serialNumber+"&deviceSerial="+deviceSerial+"&deviceName="+deviceName+"&androidVersion="+androidVersion
          console.log("print ----- start")
          console.log(serialNumber)
          console.log(deviceName)
          console.log(androidVersion)
          console.log(deviceSerial)
          console.log(stopTravelUrl)
          console.log("print ----- stop")
          $http.get(stopTravelUrl)
            .then(function(res) {
              console.log('res')
              console.log(res)
            })
            .catch(function(err) {
              console.log('err')
              console.log(err)
            })
          let count = result.data.length
        })
    })
  }

  $scope.startPopWindowMonitor = function() {
    $scope.startPopWindowMonitorModel = false
    var ShellDevices = this.getCurrentDevices()
    if (!ShellDevices.length) {
      alert('请选择至少一台设备')
    }
    ShellDevices.forEach(function(ShellDevices, index) {
      var control = ControlService.create(ShellDevices, ShellDevices.channel)
      let todoShell = 'am instrument -w -r   -e debug false -e class com.rrh.popwindow.OperatePopWindow#testCase com.rrh.popwindow.test/android.support.test.runner.AndroidJUnitRunner'
      control.shell(todoShell)
        .progressed(function(result) {
          console.log('start------')
          console.log(result)
          if (result.data.length === 1) {
            alert('设备' + result.device.model + ' 启动 Pop 弹窗监控成功\n' + result.data[0].toString())
          }
        })
        .then(function(result) {
          console.log('stop----------')
          console.log(result)
          let count = result.data.length
        })
    })
  }

  $scope.stopPopWindowMonitor = function() {
    $scope.stopPopWindowMonitorModel = false
    var ShellDevices = this.getCurrentDevices()
    if (!ShellDevices.length) {
      alert('请选择至少一台设备')
    }
    ShellDevices.forEach(function(ShellDevices, index) {
      var control = ControlService.create(ShellDevices, ShellDevices.channel)
      let todoShell = 'am force-stop com.rrh.popwindow'
      control.shell(todoShell)
        .progressed(function(result) {
          // console.log(result)
        })
        .then(function(result) {
          // console.log(result)
          let count = result.data.length
          // alert("设备"+result.device.model+' 关闭 Pop 弹窗监控\n'+result.data[count-1])
        })
    })
  }


  $scope.installApk = function($files) { //apk安装
    var installDevices = []
    let _this = this
    if ($files.length) {
      installDevices = _this.getCurrentDevices()
      if (!installDevices.length) {
        alert('请选择至少一台设备安装')
        return
      }

      var tester = ""
      $http.get("/api/v1/user").then(function(res) {
        console.log("get user ------- start")
        tester = res.data.user.name.toString()
        console.log(tester)
        console.log("get user ------- end")
      })

      $upload.upload({
        url: '/s/upload/apk',
        method: 'POST',
        file: $files
      })
        .then(function(value) {
          console.log(JSON.stringify(value))
          var href = value.data.resources.file.href.toString()
          console.log(href)
          var manifestUrl = href+"/manifest"

          var packageName = ""
          var serialNumber = ""
          var appVersionName = ""
          $http.get(manifestUrl).then(function(res) {
            console.log("manifest file ------- start")
            // console.log(res)
            packageName = res.data.manifest.package.toString()
            appVersionName = res.data.manifest.versionName.toString()
            console.log("manifest file ------- end")

            var getUrl = 'http://100.66.130.108:8081/install/startInstallTest?'+'tester='+tester+'&packageName='+packageName
            console.log("print ================================= start")
            console.log(tester)
            console.log(packageName)
            console.log(getUrl)
            console.log("print ================================= start")

            $http.get(getUrl).then(function(res) {
              console.log("get serialNumber------------- start")
              // console.log(res)
              serialNumber = res.data.data.serialNumber.toString()
              console.log(serialNumber)
              console.log("get serialNumber------------- end")
            })
          })

          $http.get(href + '/manifest')
            .then(function(res) {
              // console.log("/manifest----------start")
              // console.log(res)
              // console.log("/manifest----------end")

              if (res.data.success) {
                installDevices.forEach(function(installDevice) {
                  var control = ControlService.create(installDevice, installDevice.channel)
                  control.install({
                    href: href,
                    manifest: res.data.manifest,
                    launch: true
                  })
                    .progressed(function(result) {

                    })
                    .then(function(result) {

                      console.log("get install result =============== start")
                      console.log(result)
                      console.log("get install result =============== start")
                      var deviceSerial = result.device.serial.toString()
                      var deviceName = result.device.model.toString()
                      var installRes = result.lastData.toString()
                      var status = "FAIL"
                      var androidVersion = result.device.version.toString()
                      if (installRes === 'INSTALL_SUCCEEDED') {
                        console.log(installRes)
                        status = "SUCCESS"
                      }
                      console.log("print ----- start")
                      console.log(serialNumber)
                      console.log(deviceName)
                      console.log(deviceSerial)
                      console.log(androidVersion)
                      console.log(status)
                      console.log(appVersionName)
                      console.log("print ----- stop")
                      var stopGetUrl = "http://100.66.130.108:8081/install/stopInstallTest?serialNumber="+serialNumber+"&deviceName="+deviceName+"&deviceSerial="+deviceSerial+"&androidVersion="+androidVersion+"&status="+status+"&versionName="+appVersionName
                      console.log("stopInstallTest----------------start")
                      console.log(stopGetUrl)
                      console.log("stopInstallTest----------------end")
                      $http.get(stopGetUrl).then(function(res) {
                        console.log('res')
                        console.log(res)
                      }).catch(function(err) {
                        console.log('err')
                        console.log(err)
                      })
                      alert('apk安装' + result.lastData.toString())
                    })
                })
              }
              else {
                throw new Error('Install apk to all selected devices failed')
              }
            })
            .catch(function(err) {
              console.log(err)
            })
        })
    }
  }

  // $scope.lunchCmd = function () {
  //   $http.get('/api/cmd')
  //     .then(function (res) {
  //       console.log(res)
  //     })
  //     .catch(function (err) {
  //       console.log(err)
  //     })
  // }()

  $scope.uninstallApk = function() { //apk卸载
    $scope.unInstallModel = false
    let uninstallDevices = this.getCurrentDevices()
    let pkg = this.toUninstall
    if (!uninstallDevices.length) {
      alert('请选择至少一台设备')
      return
    }
    var tester = ""
    var serialNumber = ""
    $http.get("/api/v1/user").then(function(res) {
      console.log("get user ------- start")
      tester = res.data.user.name.toString()
      console.log(tester)
      console.log(pkg)
      console.log("get user ------- end")

      var startUninstallUrl = "http://100.66.130.108:8081/uninstall/startUninstallTest?tester="+tester+"&packageName="+pkg
      $http.get(startUninstallUrl).then(function(res) {
        console.log("serialNumber-------------start")
        serialNumber = res.data.data.serialNumber.toString()
        console.log(serialNumber)
        console.log("serialNumber-------------end")
      })
    })
    uninstallDevices.forEach(function(uninstallDevice) {
      var control = ControlService.create(uninstallDevice, uninstallDevice.channel)
      control.shell('pm uninstall ' + pkg)
        .progressed(function(result) {
        })
        .then(function(result) {
          console.log(result)

          var status = ""
          var deviceSerial = result.source.serial.toString()
          var deviceName = result.source.enhancedModel.toString()
          var androidVersion = result.source.version.toString()

          var uninstallRes = result.lastData.toString()
          console.log(uninstallRes)
          var success = "Success"
          var failure = "Failure"
          if(uninstallRes.indexOf(success)>=0){
            status = "SUCCESS"
          }else if(uninstallRes.indexOf(failure)>=0){
            status = "FAIL"
          }
          var stopUninstallUrl = "http://100.66.130.108:8081/uninstall/stopUninstallTest?status="+status+"&deviceSerial="+deviceSerial+"&deviceName="+deviceName+"&androidVersion="+androidVersion+"&serialNumber="+serialNumber
          $http.get(stopUninstallUrl).then(function(res) {
            console.log(res)
          }).catch(function(err) {
            console.log(err)
          })
          alert('APP卸载: ' + result.lastData)
        })
    })
  }
}
