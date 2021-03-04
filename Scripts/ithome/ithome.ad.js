const mobileWebRegex = /^https:\/\/m\.ithome\.com\/api\/news\/newslistpageget/;
const appRegex = /^https:\/\/api\.ithome\.com\/json\/listpage\/news/;

if (mobileWebRegex.test($request.url)) {
  const body = JSON.parse($response.body);
  body.Result = body.Result.filter((r) => r.NewsTips.every((t) => t.TipName !== "广告"));
  $done(JSON.stringify(body));
} else if (appRegex.test($request.url)) {
  const body = JSON.parse($response.body);
  body.newslist = body.newslist.filter((n) => !n.aid);
  $done(JSON.stringify(body));
}
