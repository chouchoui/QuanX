# DQ点单小程序签到

## Surge配置
```properties
[Script]
DQ点单小程序签到Cookie = type=http-request,requires-body=1,pattern=^https:\/\/wxxcx\.dairyqueen\.com\.cn\/UserXueLi\?_actionName=getXueLiSign,script-path=https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/dq/dq.sign.js
DQ点单小程序签到 = type=cron,cronexp="22 8,9 * * *",wake-system=1,script-path=https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/dq/dq.sign.js


[MITM]
hostname=*.dairyqueen.com.cn
```

## Quantumult X配置
```properties
[MITM]
hostname=*.dairyqueen.com.cn

[rewrite_local]
^https:\/\/wxxcx\.dairyqueen\.com\.cn\/UserXueLi\?_actionName=getXueLiSign url script-request-body https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/dq/dq.sign.js


[task_local]
22 8,9 * * * https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/dq/dq.sign.js, tag=DQ点单小程序签到, img-url=https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/dq/dq.task.png, enabled=true
```


## 说明
配置完毕后，打开微信 DQ点单小程序-我的（底栏）-每日签到
提示获取Cookie成功
