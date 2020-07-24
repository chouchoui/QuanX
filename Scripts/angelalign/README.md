# 时代天使小程序打卡

## QuanX配置
```properties
[MITM]
exp.angelalign.com

[rewrite_local]
^https:\/\/exp.angelalign.com\/api\/v1\/mini_program\/get_plan_list url script-request-header https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/angelalign/angelalign.cookie.js


[task_local]
30 8,13,19 * * * https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/angelalign/angelalign.task.js, tag=时代天使, enabled=true, img-url=https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/angelalign/angelalign.png
```

## 说明

1. 将`exp.angelalign.com`添加MitM
2. 添加重写
    - 重写-添加
    - 类型 `script-request-header`
    - 用以匹配的URL  
    `^https:\/\/exp.angelalign.com\/api\/v1\/mini_program\/get_plan_list`
    - 脚本路径  
    `https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/angelalign/angelalign.cookie.js`
3. 添加定时Task
    - 调试-构造请求-右上角+号-高级
    - 标签 `时代天使`
    - Cron 表达式 `30 8,13,19 * * *` （意思是每天8, 13, 19点30分执行一次脚本）
    - 脚本路径  
    `https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/angelalign/angelalign.task.js`
    - 图标  
    白色图标 `https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/angelalign/angelalign.png`  
    彩色图标 `https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/angelalign/angelalign.task.png`
    - 请求列表中点击`时代天使`-更新脚本
4. 打开微信小程序 时代天使小管家，点击左下角刷新按钮，提示Cookie获取成功
5. 禁用Cookie获取重写
