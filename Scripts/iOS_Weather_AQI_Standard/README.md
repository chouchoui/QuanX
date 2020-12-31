# iOS 天气使用最精准的空气质量
## 修改自 [Hackl0us](https://github.com/Hackl0us/SS-Rule-Snippet/blob/master/Scripts/Surge/iOS_Weather_AQI_Standard.js) 原始项目

1. 改为 Quantumult X 重写订阅
2. 添加了在 BoxJs 中填写 aqicn.org Token 功能
3. 使用了 [chavyleung](https://github.com/chavyleung) 的 [Env.js](https://github.com/chavyleung/scripts/blob/master/Env.js)，理论上脚本兼容 Quantumult X、Surge、Loon，仅测试 Quantumult X

## 使用说明
1. 打开 Quantumult X，重写 - 引用 - 添加
```
https://raw.githubusercontent.com/chouchoui/QuanX/master/iOS_Weather_AQI_Standard.conf
```
2. 依照自己的 BoxJs 的订阅方式打开 BoxJs
    - http://boxjs.com
    - http://boxjs.net
    - http://127.0.0.1:9999
> 关于 BoxJs 的使用教程在此不多做说明，具体请看 BoxJs 使用手册 [https://chavyleung.gitbook.io/boxjs/](https://chavyleung.gitbook.io/boxjs/)

3. BoxJs 中 订阅 - 添加
```
https://raw.githubusercontent.com/chouchoui/QuanX/master/vei.boxjs.json
```
4. 在 应用 中找到刚订阅的 `chouchoui 应用订阅`，点击下方的 `将 iOS 系统原生 天气 App 的空气质量标准改为 AQI-US` 应用
5. 在 应用设置 的 aqicn API Token 文本框中填入 aqicn.org 申请获得的 Token，保存设置
6. 在天气应用中查看是否生效