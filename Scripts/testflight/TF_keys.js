/*********************************
QuantumultX 添加脚本：
*********************************
QuantumultX重写引用地址：
https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/testflight/TF_keys.js
[rewrite_local]
^https:\/\/testflight\.apple\.com\/v3\/accounts/.*\/apps$ url script-request-header https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/testflight/TF_keys.js
[mitm]
hostname = testflight.apple.com
*********************************/

$prefs.setValueForKey(null, 'request_id')
let url = $request.url
let key = url.replace(/(.*accounts\/)(.*)(\/apps)/, '$2')
const headers = Object.keys($request.headers).reduce((t, i) => ((t[i.toLowerCase()] = $request.headers[i]), t), {});

let session_id = headers['x-session-id']
let session_digest = headers['x-session-digest']
let request_id = headers['x-request-id']
$prefs.setValueForKey(key, 'key')
$prefs.setValueForKey(session_id, 'session_id')
$prefs.setValueForKey(session_digest, 'session_digest')
$prefs.setValueForKey(request_id, 'request_id')
if ($prefs.valueForKey('request_id') !== null) {
    $notify('请关闭本脚本', '信息获取成功','')
} else {
    $notify('信息获取失败','请打开MITM H2开关并添加testflight.apple.com','')
}
$done({})