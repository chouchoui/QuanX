# 宜家20201028活动签到

## QuanX配置
```properties
[MITM]
srv.app.ikea.cn

[rewrite_local]
^https:\/\/srv\.app\.ikea\.cn\/activity\/checkIn\/progress\?activityId=20201028 url script-request-header https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/ikea/20201028/checkIn.cookie.js


[task_local]
30 8,9 * * * https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/ikea/20201028/checkIn.task.js, tag=宜家20201028活动签到, img-url=https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/ikea/ikea.task.png, enabled=false
```

## 说明

1. 将`srv.app.ikea.cn`添加MitM
2. 添加重写
    - 重写-添加
    - 类型 `script-request-header`
    - 用以匹配的URL  
    `^https:\/\/srv\.app\.ikea\.cn\/activity\/checkIn\/progress\?activityId=20201028`
    - 脚本路径  
    `https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/ikea/20201028/checkIn.cookie.js`
3. 添加定时Task
    - 调试-构造请求-右上角+号-高级
    - 标签 `宜家20201028活动签到`
    - Cron 表达式 `30 8,9 * * *` （意思是每天8, 9点30分执行一次脚本）
    - 脚本路径  
    `https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/ikea/20201028/checkIn.task.js`
    - 图标  
    白色图标 `https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/ikea/ikea.png`  
    彩色图标 `hhttps://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/ikea/ikea.task.png`
    - 请求列表中点击`宜家20201028活动签到`-更新脚本
4. 打开 `IKEA宜家家居` APP，点击首页里的 “每日签到打卡，解锁神秘好礼”，提示获取会话成功
5. 禁用Cookie获取重写
