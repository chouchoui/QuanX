const regexShare = /^https?:\/\/(share|weibointl)\.api\.weibo\.(cn|com)\/(share|portal)(.*)weibo_id=(.*)/;
const regexToast = /^https:\/\/weibo\.cn\/sinaurl\?toasturl=(.*)/;
const regexShareHtml = /^https?:\/\/(share|weibointl)\.api\.weibo\.(cn|com)\/share\/(.*).html/;

const url = $request.url;

const $ = new helper();

const redirectHtml = (url) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script>
      window.location.href = "${url}";
    </script>
  </body>
</html>
`;

let resultUrl = "";

if (regexShareHtml.test(url)) {
  if ($response) {
    const body = $response.body;
    let match = [];
    const reg1 = /onclick="serach\((?<weiboId>.*),(.*),(.*)\)"/;
    const reg2 = /onclick="forward\(0,(?<weiboId>.*),(.*)\)"/;

    if (reg1.test(body)) {
      match = reg1.exec(body);
    } else if (reg2.test(body)) {
      match = reg2.exec(body);
    } else {
      console.log(body);
      $.notify(`微博重定向错误`, "", "未找到weiboId");
      $done({});
    }
    if (match && match.length > 0) {
      const weiboId = match.groups.weiboId;
      resultUrl = `https://m.weibo.cn/status/${weiboId}`;
    }
  }
} else if (regexToast.test(url)) {
  if (["&gsid=", "&toastflag="].every((r) => !url.includes(r))) {
    resultUrl = getParameterByName(url, "toasturl");
  }
} else if (regexShare.test(url)) {
  const matchs = url.match(regexShare);
  const weiboId = matchs[5];
  resultUrl = `https://m.weibo.cn/status/${weiboId}`;
}

if (resultUrl) {
  $.notify(`🔗点击打开微博`, "", resultUrl, resultUrl);
  $done({ body: redirectHtml(resultUrl) });
}

function getParameterByName(params, name) {
  var match = RegExp("[?&]" + name + "=([^&]*)").exec(params);
  return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

function helper() {
  const isQuanX = typeof $task != "undefined";
  const isLoon = typeof $loon != "undefined";
  const isSurge = typeof $httpClient != "undefined" && !isLoon;
  this.notify = (title, subtitle, message, url) => {
    if (isLoon) $notification.post(title, subtitle, message, url);
    if (isQuanX) $notify(title, subtitle, message, { "open-url": url, "update-pasteboard": url });
    if (isSurge) $notification.post(title, subtitle, message, { url: url });
  };
  this.get = (url, cb) => {
    if (isSurge) {
      $httpClient.get(url, cb);
    }
    if (isQuanX) {
      url.method = "GET";
      $task.fetch(url).then((resp) => cb(null, resp, resp.body));
    }
  };
}
