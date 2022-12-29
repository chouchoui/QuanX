/*
请自行在AdGuard等广告屏蔽软件/内容拦截器里添加以下规则
manhuabika.com###homecontentbox
manhuabika.com##.catListview>a
 */

const reg1 = /https:\/\/api\.manhuabika\.com\/announcements/;

let body = {};

if (reg1.test($request.url)) {
  if ($response.body) {
    console.log($response.body);
    body = JSON.parse($response.body);
    body.data.announcements.docs = [];
    body.data.announcements.total = 0;
    $done({
      body: JSON.stringify(body),
    });
  } else {
    $done({});
  }
}
