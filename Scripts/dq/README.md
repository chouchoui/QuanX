# DQ点单小程序签到

## Surge配置
```properties
[Script]
DQ点单小程序签到Cookie = type=http-request,pattern=^https:\/\/wechat\.dairyqueen\.com\.cn\/member\/info,script-path=https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/dq/dq.sign.js
DQ点单小程序签到 = type=cron,cronexp="22 8,9 * * *",wake-system=1,script-path=https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/dq/dq.sign.js


[MITM]
hostname=wechat.dairyqueen.com.cn
```

## Quantumult X配置
```properties
[MITM]
hostname=wechat.dairyqueen.com.cn

[rewrite_local]
^https:\/\/wechat\.dairyqueen\.com\.cn\/member\/info url script-request-header https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/dq/dq.sign.js


[task_local]
22 8,9 * * * ^https:\/\/wechat\.dairyqueen\.com\.cn\/member\/info url script-request-header https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/dq/dq.sign.js, tag=DQ点单小程序签到, img-url=https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/dq/dq.task.png, enabled=true
```


## 说明
配置完毕后，打开微信 DQ点单小程序-我的（底栏）-每日签到
提示获取Cookie成功