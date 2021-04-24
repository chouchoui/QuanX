## resource-parser.js

目前只能用于过滤外部引用的RULE-SET、DOMAIN-SET、Module

### 1. 配置
Surge 配置`[Script]`中添加
```properties
[Script]
ResourceParser = type=http-request,pattern=http:\/\/resource\.parser,requires-body=1,max-size=-1,timeout=10,script-path=https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/surge-tool/resource-parser.js
```

对于想要修改的RULE-SET、DOMAIN-SET、Module外部链接进行 Url Encode（和近期热门的订阅流量显示脚本处理方式一样）拼接如下链接。  
http://resource.parser?url=UrlEncode后的链接&out=过滤关键词1+过滤关键词2

### 2. 使用示例
以下基于真实需求  
引用的外部去广告存在误伤特定域名，存在与微博广告过滤脚本冲突的分流或重写这种情况

有一条原始配置  
DOMAIN-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Advertising/Advertising_Domain.list,reject  
假如想要过滤包含 microsoft、sdkapp.uve、wbapp.uve的条目，则修改为：  
DOMAIN-SET,http://resource.parser?url=https%3A%2F%2Fgithub.com%2Fblackmatrix7%2Fios_rule_script%2Fraw%2Fmaster%2Frule%2FSurge%2FAdvertising%2FAdvertising_Domain.list&out=microsoft+sdkapp.uve+wbapp.uve,reject


广告重写模块
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rewrite/Surge/Advertising/Advertising.sgmodule  
想要过滤包含uve的条目，删除原先的模块，重新用以下链接添加模块  
http://resource.parser?url=https%3A%2F%2Fraw.githubusercontent.com%2Fblackmatrix7%2Fios_rule_script%2Fmaster%2Frewrite%2FSurge%2FAdvertising%2FAdvertising.sgmodule&out=uve