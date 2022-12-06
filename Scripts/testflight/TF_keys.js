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

const reg1 = /^https:\/\/testflight\.apple\.com\/v3\/accounts\/(.*)\/apps$/;
const reg2 = /^https:\/\/testflight\.apple\.com\/join\/(.*)/;

if (reg1.test($request.url)) {
  $prefs.setValueForKey(null, "request_id");
  let url = $request.url;
  let key = url.replace(/(.*accounts\/)(.*)(\/apps)/, "$2");
  const headers = Object.keys($request.headers).reduce((t, i) => ((t[i.toLowerCase()] = $request.headers[i]), t), {});

  let session_id = headers["x-session-id"];
  let session_digest = headers["x-session-digest"];
  let request_id = headers["x-request-id"];
  $prefs.setValueForKey(key, "key");
  $prefs.setValueForKey(session_id, "session_id");
  $prefs.setValueForKey(session_digest, "session_digest");
  $prefs.setValueForKey(request_id, "request_id");
  if ($prefs.valueForKey("request_id") !== null) {
    $notify("TestFlight自动加入", "信息获取成功", "");
  } else {
    $notify("TestFlight自动加入", "信息获取失败", "请添加testflight.apple.com");
  }
  $done({});
} else if (reg2.test($request.url)) {
  let appId = $prefs.valueForKey("APP_ID");
  if (!appId) {
    appId = "";
  }
  let arr = appId.split(",");
  const id = reg2.exec($request.url)[1];
  arr.push(id);
  arr = unique(arr).filter((a) => a);
  if (arr.length > 0) {
    appId = arr.join(",");
  }
  $prefs.setValueForKey(appId, "APP_ID");
  $notify("TestFlight自动加入", `已添加APP_ID: ${id}`, `当前ID: ${appId}`);
  $done({});
}

function unique(arr) {
  return Array.from(new Set(arr));
}
