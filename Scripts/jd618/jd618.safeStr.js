// https://api.m.jd.com/client.action?functionId=cakebaker_ckCollectScore
// ^https:\/\/api.m.jd.com\/client.action\?functionId=cakebaker_ckCollectScore url script-request-body nzw9314/chouchoui/jd618.safeStr.js

const cookieName = "chouchoui_jd_618_safeStr"
function getParameterByName(params, name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(params);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

const resBody = $request.body;
console.log("safeStr-------------------");
const safeStrBodyString = getParameterByName(resBody, "body");
const safeStrBodyJson = JSON.parse(safeStrBodyString)
const safeStr = safeStrBodyJson.safeStr;
console.log(JSON.stringify(safeStr));
$prefs.setValueForKey(safeStr, cookieName)
$notify("京东 618", "safeStr", JSON.stringify(safeStr));
//console.log(body);
//$notify("京东 618", "safeStr", JSON.stringify(body));
$done({})



