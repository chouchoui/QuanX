const regexShare = /^https?:\/\/(share|weibointl)\.api\.weibo\.(cn|com)\/(share|portal)(.*)weibo_id=(.*)/;

const regexToast = /^https:\/\/weibo\.cn\/sinaurl\?toasturl=(.*)/


const url = $request.url

const $ = new tools();

if (regexShare.test(url)) {

  const matchs = url.match(regexShare);
  const weiboId = matchs[5];
  const resultUrl = `https://m.weibo.cn/status/${weiboId}`;
  $.notify(``,"", "🔗点击打开微博", resultUrl)
  
} else if (regexToast.test(url)) {
  
  if (["&gsid=", "&toastflag="].every(r => !url.includes(r))) {
    const resultUrl = getParameterByName(url, "toasturl");
  $.notify(``,"", "🔗点击打开浏览器", resultUrl)
  }
  
}

$done({});


function getParameterByName(params, name) {
  var match = RegExp("[?&]" + name + "=([^&]*)").exec(params);
  return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

function tools() {
  const isQuanX = typeof $task != "undefined";
  const isLoon = typeof $loon != "undefined";
  const isSurge = typeof $httpClient != "undefined" && !_isLoon;
  this.notify = (title, subtitle, message, url) => {
    if (isLoon) $notification.post(title, subtitle, message, url);
    if (isQuanX) $notify(title, subtitle, message, { "open-url": url });
    if (isSurge) $notification.post(title, subtitle, message, { url: url });
  };
}
