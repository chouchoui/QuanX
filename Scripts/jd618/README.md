# 京东618叠蛋糕（已过期）

此脚本用于处理后期 活动太火爆 问题  

添加重写
```properties
[rewrite_local]
^https:\/\/api.m.jd.com\/client.action\?functionId=cakebaker_ckCollectScore - script-request-body https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/jd618/jd618.safeStr.js
```

修改chavyleung/jd/jd.618.js  
第272行修改为
```js
safeStr: $.VAL_safeStr
```
在第9行添加
```js
$.VAL_safeStr = $.getdata('chouchoui_jd_618_safeStr') || JSON.stringify({});
```

之后手动完成一次小精灵任务