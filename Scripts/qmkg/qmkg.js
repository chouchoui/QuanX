const $vei = init();
$vei.url = 'vei_qmkg_url';
$vei.headers = 'vei_qmkg_headers';
$vei.body = 'vei_qmkg_body';

const $url = $vei.read($vei.url);
const $headers = JSON.parse($vei.read($vei.headers));
const $body = $vei.read($vei.body);

const headers = {
  'Accept-Encoding': $headers['Accept-Encoding'],
  Cookie: $headers['Cookie'],
  'Content-Type': $headers['Content-Type'],
  Referer: $headers['Referer'],
  Host: $headers['Host'],
  'User-Agent': $headers['User-Agent'],
  'Content-Length': $headers['Content-Length'],
  'No-Chunked': $headers['No-Chunked'],
  'Accept-Language': $headers['Accept-Language'],
  Connection: $headers['Connection'],
};

function sign() {
  const options = { url: $url, headers: headers, body: $body };
  $vei.post(options, (error, response, data) => {
    const title = '全民K歌';
    if (error) {
      console.log(error);
      this.notify(title, '签到结果: 失败', '请查看日志');
    } else if (response.status === 200) {
      const result = JSON.parse(data);
      const total = result.data['task.revisionSignInGetAward'].total;
      const ret = result.data['task.revisionSignInGetAward'].ret;
      let subTitle = ``;
      let detail = ``;
      if (total != 0) {
        const num = result.data['task.revisionSignInGetAward'].awards[0].num;
        subTitle = `签到结果: 成功`;
        detail = `获得鲜花: ${num}朵,已连续签到:${total}天`;
      } else if (ret == -11532) {
        subTitle = `签到结果: 成功 (重复签到)`;
      } else {
        subTitle = `签到结果: 失败`;
      }
      $vei.notify(title, subTitle, detail);
      $vei.end();
    }
  });
}

sign();

function init() {
  const isRequest = typeof $request != 'undefined';
  const isSurge = typeof $httpClient != 'undefined';
  const isQuanX = typeof $task != 'undefined';
  const notify = (title, subtitle, message) => {
    if (isQuanX) $notify(title, subtitle, message);
    if (isSurge) $notification.post(title, subtitle, message);
  };
  const write = (value, key) => {
    if (isQuanX) return $prefs.setValueForKey(value, key);
    if (isSurge) return $persistentStore.write(value, key);
  };
  const read = (key) => {
    if (isQuanX) return $prefs.valueForKey(key);
    if (isSurge) return $persistentStore.read(key);
  };
  const post = (options, callback) => {
    if (isQuanX) {
      if (typeof options == 'string') options = { url: options };
      options['method'] = 'POST';
      $task.fetch(options).then(
        (response) => {
          response['status'] = response.statusCode;
          callback(null, response, response.body);
        },
        (reason) => callback(reason.error, null, null)
      );
    }
    if (isSurge) $httpClient.post(options, callback);
  };
  const end = () => {
    if (isQuanX) isRequest ? $done({}) : '';
    if (isSurge) isRequest ? $done({}) : $done();
  };
  return { isRequest, isQuanX, isSurge, notify, write, read, post, end };
}
