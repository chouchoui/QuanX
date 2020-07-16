const $vei = init();
$vei.url = "vei_qmkg_url"
$vei.headers = "vei_qmkg_headers";
$vei.body = "vei_qmkg_body";

function getParameterByName(params, name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(params);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function getUidFromCookie(cookie) {
    const array = cookie.split("; ")
    let uid = ''
    for (const item of array) {
        if (item.indexOf('uid=') >= 0) {
            uid = item.split('=')[1]
        }
    }
    return uid
}

try {
    const url = $request.url;
    $vei.write(url, $vei.url);
    const headers = JSON.stringify($request.headers);
    $vei.write(headers, $vei.headers);

    const openkey = getParameterByName(url, "g_tk_openkey")
    const uid = getUidFromCookie($request.headers.Cookie);

    const body = {
        "g_tk_openkey": openkey,
        "t_uid": uid,
        "t_show_entry": 0,
        "t_mapExtInfo": {
            "device_id": ""
        },
        "t_vctAppId": [

        ],
        "ns": "KG_TASK",
        "cmd": "task.revisionSignInGetAward",
        "ns_inbuf": "",
        "mapExt": {
            "file": "taskJce",
            "cmdName": "GetSignInAwardReq",
            "l5api": {
                "modid": 503937,
                "cmd": 589824
            },
            "l5api_exp1": {
                "modid": 817089,
                "cmd": 3801088
            }
        }
    }
    $vei.write(JSON.stringify(body), $vei.body);
    $vei.notify("全民K歌", "Cookie", "Cookie获取成功")
} catch (error) {
    console.log(error)
    $vei.notify("全民K歌", "Cookie获取失败", "请查看日志")
}

function init() {
    const isRequest = typeof $request != "undefined"
    const isSurge = typeof $httpClient != "undefined"
    const isQuanX = typeof $task != "undefined"
    const notify = (title, subtitle, message) => {
        if (isQuanX) $notify(title, subtitle, message)
        if (isSurge) $notification.post(title, subtitle, message)
    }
    const write = (value, key) => {
        if (isQuanX) return $prefs.setValueForKey(value, key)
        if (isSurge) return $persistentStore.write(value, key)
    }
    const read = (key) => {
        if (isQuanX) return $prefs.valueForKey(key)
        if (isSurge) return $persistentStore.read(key)
    }
    const post = (options, callback) => {
        if (isQuanX) {
            if (typeof options == "string") options = { url: options }
            options["method"] = "POST"
            $task.fetch(options).then(response => {
                response["status"] = response.statusCode
                callback(null, response, response.body)
            }, reason => callback(reason.error, null, null))
        }
        if (isSurge) $httpClient.post(options, callback)
    }
    const end = () => {
        if (isQuanX) isRequest ? $done({}) : ""
        if (isSurge) isRequest ? $done({}) : $done()
    }
    return { isRequest, isQuanX, isSurge, notify, write, read, post, end }
}


$done({});
