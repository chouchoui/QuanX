# NGA刮墙

## QuanX配置
```properties
[MITM]
ngabbs.com

[rewrite_local]
^https:\/\/ngabbs.com\/nuke.php\?? url script-request-body https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/nga/nga.cookie.js


[task_local]
10 0 * * * https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/nga/nga.js, tag=NGA刮墙, enabled=true, img-url=https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/nga/nga.png
```

## 说明

1. 将`ngabbs.com`添加MitM
2. 添加重写
    - 重写-添加-填入重写规则`^https:\/\/ngabbs.com\/nuke.php\?? url script-request-body https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/nga/nga.cookie.js`
    - 重写-搜索-搜索ngabbs-点击右侧三点-更新脚本
3. 添加定时Task
    - 调试-构造请求-右上角+号-高级-填入内容`10 0 * * * https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/nga/nga.js, tag=NGA刮墙, enabled=true, img-url=https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/nga/nga.png`
    - 请求列表中点击`NGA刮墙`-更新脚本
4. 杀掉NGA后台并重新打开NGA，提示Cookie获取成功
5. 禁用Cookie获取重写
