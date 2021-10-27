# 感谢原作者
##  脚本修改自 `https://service.2ti.st/QuanX/Script/jd_tb_price/main.js`

本人自用需求处理脚本可能出现的几个问题  

--- 
  
https://github.com/chouchoui/QuanX/blob/4fb75e7ea188a87e6ac9ae47f9081883a6a0a85b/Scripts/other/jd_tb_price.js#L30
```js
// 原始代码
const resp = isUndefined($response) ? null : $response;
// 修改为
const resp = typeof $response !== "undefined" ? $response : null;
```
某些地方使用原始代码判断 `undefined` 将导致脚本异常

---  
https://github.com/chouchoui/QuanX/blob/4fb75e7ea188a87e6ac9ae47f9081883a6a0a85b/Scripts/other/jd_tb_price.js#L316
```js
// 添加内容
if (obj["store"].length < 2) {
    return "暂无历史价格信息";
}
```
某些淘宝商品页不添加以上内容将导致脚本异常